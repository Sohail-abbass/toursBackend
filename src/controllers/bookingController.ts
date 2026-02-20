import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Booking from '../models/Booking';
import Tour from '../models/Tour';
import Package from '../models/Package';
import { sendBookingEmail } from "../utils/sendMail";

export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      bookingType,
      itemId,
      customerName,
      customerEmail,
      customerPhone,
      travelers,
      packageType,
      message,
      travelDate
    } = req.body;

    // ==========================
    // BASIC VALIDATION
    // ==========================
    if (!bookingType || !itemId || !customerName || !customerEmail || !customerPhone || !travelers) {
      res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      res.status(400).json({
        success: false,
        message: 'Invalid item ID'
      });
      return;
    }

    let item: any;
    let totalPrice = 0;

    // ==========================
    // TOUR BOOKING LOGIC
    // ==========================
    if (bookingType === 'tour') {

      if (!packageType) {
        res.status(400).json({
          success: false,
          message: 'Tour type (solo, couple, deluxe) is required'
        });
        return;
      }

      item = await Tour.findById(itemId);

      if (!item || item.status !== 'active') {
        res.status(404).json({
          success: false,
          message: 'Tour not found or inactive'
        });
        return;
      }

      const priceMap: any = {
        solo: item.solo,
        couple: item.couple,
        deluxe: item.deluxe
      };

      const selectedPrice = priceMap[packageType];

      if (!selectedPrice) {
        res.status(400).json({
          success: false,
          message: 'Invalid tour type selected'
        });
        return;
      }

      totalPrice = selectedPrice * travelers;
    }

    // ==========================
    // PACKAGE BOOKING LOGIC
    // ==========================
    else if (bookingType === 'package') {

      item = await Package.findById(itemId);

      if (!item || item.status !== 'active') {
        res.status(404).json({
          success: false,
          message: 'Package not found or inactive'
        });
        return;
      }

      totalPrice = item.price * travelers;
    }

    else {
      res.status(400).json({
        success: false,
        message: 'Invalid booking type'
      });
      return;
    }

    // ==========================
    // CREATE BOOKING
    // ==========================
    const booking = await Booking.create({
      bookingType,
      itemId,
      itemTitle: item.title,
      customerName,
      customerEmail,
      customerPhone,
      travelers,
      packageType: bookingType === 'tour' ? packageType : undefined,
      totalPrice,
      message,
      travelDate
    });
    await sendBookingEmail({
      bookingRef: booking.bookingRef!,      bookingType: booking.bookingType,
      itemTitle: booking.itemTitle,
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      customerPhone: booking.customerPhone,
      travelers: booking.travelers,
      totalPrice: booking.totalPrice,
      message: booking.message,
    });
    res.status(201).json({
      success: true,
      message: 'Booking created successfully! We will contact you shortly.',
      data: booking
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating booking',
      error: (error as Error).message
    });
  }
};
export const updateBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const allowedUpdates = ['status', 'paymentStatus', 'notes'];

    const updates: any = {};

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!booking) {
      res.status(404).json({ success: false, message: 'Booking not found' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: booking
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating booking',
      error: (error as Error).message
    });
  }
};
export const getBookingStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await Booking.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          revenue: { $sum: '$totalPrice' }
        }
      }
    ]);

    const paidRevenue = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        statusBreakdown: stats,
        totalRevenue: paidRevenue[0]?.total || 0
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stats',
      error: (error as Error).message
    });
  }
};
