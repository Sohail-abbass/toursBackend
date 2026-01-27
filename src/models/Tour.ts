import mongoose, { Document, Schema } from 'mongoose';

export interface ITour extends Document {
  title: string;
  slug: string;
  location: string;
  days: number;
  nights: number;
  price: number;
  image: string;
  gallery: string[];
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    activities?: string[];
    meals?: string[];
  }[];
  solo: number;
  couple: number;
  deluxe: number;
  featured: boolean;
  status: 'active' | 'inactive' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

const TourSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Tour title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    days: {
      type: Number,
      required: [true, 'Number of days is required'],
      min: [1, 'Days must be at least 1']
    },
    nights: {
      type: Number,
      required: [true, 'Number of nights is required'],
      min: [0, 'Nights cannot be negative']
    },
    price: {
      type: Number,
      required: [true, 'Base price is required'],
      min: [0, 'Price cannot be negative']
    },
    image: {
      type: String,
      required: [true, 'Main image is required']
    },
    gallery: [{
      type: String
    }],
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: [500, 'Short description cannot exceed 500 characters']
    },
    fullDescription: {
      type: String,
      required: [true, 'Full description is required']
    },
    highlights: [{
      type: String
    }],
    inclusions: [{
      type: String
    }],
    exclusions: [{
      type: String
    }],
    itinerary: [{
      day: { type: Number, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      activities: [{ type: String }],
      meals: [{ type: String }]
    }],
    solo: {
      type: Number,
      required: [true, 'Solo price is required'],
      min: [0, 'Price cannot be negative']
    },
    couple: {
      type: Number,
      required: [true, 'Couple price is required'],
      min: [0, 'Price cannot be negative']
    },
    deluxe: {
      type: Number,
      required: [true, 'Deluxe price is required'],
      min: [0, 'Price cannot be negative']
    },
    featured: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'draft'],
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

// Create slug from title before saving
TourSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = (this.title as string)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Index for search
TourSchema.index({ title: 'text', location: 'text', shortDescription: 'text' });

export default mongoose.model<ITour>('Tour', TourSchema);

