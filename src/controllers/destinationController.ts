import { Request, Response } from 'express';
import Destination from '../models/Destination';

// @desc    Get all destinations
// @route   GET /api/destinations
// @access  Public
export const getDestinations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { featured, region, limit, page } = req.query;
    
    // Build query
    const query: any = { status: 'active' };
    if (featured === 'true') query.featured = true;
    if (region) query.region = region;
    
    // Pagination
    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 10;
    const skip = (pageNum - 1) * limitNum;
    
    const destinations = await Destination.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);
    
    const total = await Destination.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: destinations.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: destinations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching destinations',
      error: (error as Error).message
    });
  }
};

// @desc    Get single destination by slug
// @route   GET /api/destinations/:slug
// @access  Public
export const getDestinationBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const destination = await Destination.findOne({ slug: req.params.slug });
    
    if (!destination) {
      res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: destination
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching destination',
      error: (error as Error).message
    });
  }
};

// @desc    Create new destination
// @route   POST /api/destinations
// @access  Private (Admin)
export const createDestination = async (req: Request, res: Response): Promise<void> => {
  try {
    const destination = await Destination.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Destination created successfully',
      data: destination
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating destination',
      error: (error as Error).message
    });
  }
};

// @desc    Update destination
// @route   PUT /api/destinations/:id
// @access  Private (Admin)
export const updateDestination = async (req: Request, res: Response): Promise<void> => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!destination) {
      res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Destination updated successfully',
      data: destination
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating destination',
      error: (error as Error).message
    });
  }
};

// @desc    Delete destination
// @route   DELETE /api/destinations/:id
// @access  Private (Admin)
export const deleteDestination = async (req: Request, res: Response): Promise<void> => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    
    if (!destination) {
      res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Destination deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting destination',
      error: (error as Error).message
    });
  }
};

// @desc    Get featured destinations
// @route   GET /api/destinations/featured
// @access  Public
export const getFeaturedDestinations = async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 4;
    
    const destinations = await Destination.find({ featured: true, status: 'active' })
      .sort({ createdAt: -1 })
      .limit(limit);
    
    res.status(200).json({
      success: true,
      count: destinations.length,
      data: destinations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured destinations',
      error: (error as Error).message
    });
  }
};

