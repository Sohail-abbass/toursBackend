import { Request, Response } from 'express';
import Tour from '../models/Tour';

// @desc    Get all tours
// @route   GET /api/tours
// @access  Public
export const getTours = async (req: Request, res: Response): Promise<void> => {
  try {
    const { featured, status, search, sort, limit, page } = req.query;
    
    // Build query
    const query: any = {};
    
    if (featured === 'true') query.featured = true;
    if (status) query.status = status;
    if (search) {
      query.$text = { $search: search as string };
    }
    
    // Pagination
    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 10;
    const skip = (pageNum - 1) * limitNum;
    
    // Sort
    let sortOption: any = { createdAt: -1 };
    if (sort === 'price') sortOption = { price: 1 };
    if (sort === '-price') sortOption = { price: -1 };
    if (sort === 'days') sortOption = { days: 1 };
    
    const tours = await Tour.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);
    
    const total = await Tour.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: tours.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: tours
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tours',
      error: (error as Error).message
    });
  }
};

// @desc    Get single tour by slug
// @route   GET /api/tours/:slug
// @access  Public
export const getTourBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const tour = await Tour.findOne({ slug: req.params.slug });
    
    if (!tour) {
      res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: tour
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tour',
      error: (error as Error).message
    });
  }
};

// @desc    Get single tour by ID
// @route   GET /api/tours/id/:id
// @access  Public
export const getTourById = async (req: Request, res: Response): Promise<void> => {
  try {
    const tour = await Tour.findById(req.params.id);
    
    if (!tour) {
      res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: tour
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tour',
      error: (error as Error).message
    });
  }
};

// @desc    Create new tour
// @route   POST /api/tours
// @access  Private (Admin)
export const createTour = async (req: Request, res: Response): Promise<void> => {
  try {
    const tour = await Tour.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Tour created successfully',
      data: tour
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating tour',
      error: (error as Error).message
    });
  }
};

// @desc    Update tour
// @route   PUT /api/tours/:id
// @access  Private (Admin)
export const updateTour = async (req: Request, res: Response): Promise<void> => {
  try {
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!tour) {
      res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Tour updated successfully',
      data: tour
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating tour',
      error: (error as Error).message
    });
  }
};

// @desc    Delete tour
// @route   DELETE /api/tours/:id
// @access  Private (Admin)
export const deleteTour = async (req: Request, res: Response): Promise<void> => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    
    if (!tour) {
      res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Tour deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting tour',
      error: (error as Error).message
    });
  }
};

// @desc    Get featured tours
// @route   GET /api/tours/featured
// @access  Public
export const getFeaturedTours = async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 4;
    
    const tours = await Tour.find({ featured: true, status: 'active' })
      .sort({ createdAt: -1 })
      .limit(limit);
    
    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured tours',
      error: (error as Error).message
    });
  }
};

