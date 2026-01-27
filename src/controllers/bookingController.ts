import { Request, Response } from 'express';
import Booking from '../models/Booking';

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private (Admin)
export const getBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, bookingType, page, limit, sort } = req.query;
    
    // Build query
    const query: any = {};
    if (status) query.status = status;
    if (bookingType) query.bookingType = bookingType;
    
    // Pagination
    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 20;
    const skip = (pageNum - 1) * limitNum;
    
    // Sort
    let sortOption: any = { createdAt: -1 };
    if (sort === 'oldest') sortOption = { createdAt: 1 };
    if (sort === 'price') sortOption = { totalPrice: -1 };
    
    const bookings = await Booking.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);
    
    const total = await Booking.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: (error as Error).message
    });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private (Admin)
export const getBookingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: (error as Error).message
    });
  }
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const booking = await Booking.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully! We will contact you shortly.',
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating booking',
      error: (error as Error).message
    });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private (Admin)
export const updateBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, paymentStatus, notes } = req.body;
    
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, paymentStatus, notes },
      { new: true, runValidators: true }
    );
    
    if (!booking) {
      res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
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

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private (Admin)
export const deleteBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    
    if (!booking) {
      res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting booking',
      error: (error as Error).message
    });
  }
};

// @desc    Get booking stats
// @route   GET /api/bookings/stats
// @access  Private (Admin)
export const getBookingStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });
    
    const revenueAgg = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    
    const totalRevenue = revenueAgg[0]?.total || 0;
    
    res.status(200).json({
      success: true,
      data: {
        totalBookings,
        pendingBookings,
        confirmedBookings,
        completedBookings,
        totalRevenue
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching booking stats',
      error: (error as Error).message
    });
  }
};

