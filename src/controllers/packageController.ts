import { Request, Response } from 'express';
import Package from '../models/Package';

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
export const getPackages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, search, sort, limit, page, priceMin, priceMax } = req.query;
    
    // Build query
    const query: any = {};
    
    if (status) query.status = status;
    if (search) {
      query.$text = { $search: search as string };
    }
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = parseInt(priceMin as string);
      if (priceMax) query.price.$lte = parseInt(priceMax as string);
    }
    
    // Pagination
    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 10;
    const skip = (pageNum - 1) * limitNum;
    
    // Sort
    let sortOption: any = { createdAt: -1 };
    if (sort === 'price') sortOption = { price: 1 };
    if (sort === '-price') sortOption = { price: -1 };
    if (sort === 'duration') sortOption = { 'duration.days': 1 };
    
    const packages = await Package.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);
    
    const total = await Package.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: packages.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: packages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching packages',
      error: (error as Error).message
    });
  }
};

// @desc    Get single package by slug
// @route   GET /api/packages/:slug
// @access  Public
export const getPackageBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const pkg = await Package.findOne({ slug: req.params.slug });
    
    if (!pkg) {
      res.status(404).json({
        success: false,
        message: 'Package not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: pkg
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching package',
      error: (error as Error).message
    });
  }
};

// @desc    Get single package by ID
// @route   GET /api/packages/id/:id
// @access  Public
export const getPackageById = async (req: Request, res: Response): Promise<void> => {
  try {
    const pkg = await Package.findById(req.params.id);
    
    if (!pkg) {
      res.status(404).json({
        success: false,
        message: 'Package not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: pkg
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching package',
      error: (error as Error).message
    });
  }
};

// @desc    Create new package
// @route   POST /api/packages
// @access  Private (Admin)
export const createPackage = async (req: Request, res: Response): Promise<void> => {
  try {
    const pkg = await Package.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Package created successfully',
      data: pkg
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating package',
      error: (error as Error).message
    });
  }
};

// @desc    Update package
// @route   PUT /api/packages/:id
// @access  Private (Admin)
export const updatePackage = async (req: Request, res: Response): Promise<void> => {
  try {
    const pkg = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!pkg) {
      res.status(404).json({
        success: false,
        message: 'Package not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Package updated successfully',
      data: pkg
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating package',
      error: (error as Error).message
    });
  }
};

// @desc    Delete package
// @route   DELETE /api/packages/:id
// @access  Private (Admin)
export const deletePackage = async (req: Request, res: Response): Promise<void> => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    
    if (!pkg) {
      res.status(404).json({
        success: false,
        message: 'Package not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Package deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting package',
      error: (error as Error).message
    });
  }
};

