import mongoose, { Document, Schema } from 'mongoose';

export interface IPackage extends Document {
  title: string;
  slug: string;
  duration: {
    days: number;
    nights: number;
  };
  price: number;
  currency: string;
  description: string;
  mainImage: string;
  gallery: string[];
  destinations: {
    name: string;
    stayDays: number;
    image: string;
  }[];
  itinerary: {
    day: number;
    title: string;
    description?: string;
    activities: string[];
    meals: string[];
    stay: string;
  }[];
  accommodation: {
    hotelCategory: string;
    roomType: string;
    totalNights: number;
    cities?: string[];
  };
  transport: {
    mode: string;
    fuelIncluded: boolean;
    driver: boolean;
    airportTransfers?: boolean;
  };
  includes: string[];
  excludes: string[];
  idealFor: string[];
  status: 'active' | 'inactive' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

const PackageSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Package title is required'],
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
    duration: {
      days: {
        type: Number,
        required: [true, 'Number of days is required'],
        min: [1, 'Days must be at least 1']
      },
      nights: {
        type: Number,
        required: [true, 'Number of nights is required'],
        min: [0, 'Nights cannot be negative']
      }
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    currency: {
      type: String,
      default: 'PKR'
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    mainImage: {
      type: String,
      required: [true, 'Main image is required']
    },
    gallery: [{
      type: String
    }],
    destinations: [{
      name: { type: String, required: true },
      stayDays: { type: Number, required: true },
      image: { type: String }
    }],
    itinerary: [{
      day: { type: Number, required: true },
      title: { type: String, required: true },
      description: { type: String },
      activities: [{ type: String }],
      meals: [{ type: String }],
      stay: { type: String }
    }],
    accommodation: {
      hotelCategory: { type: String },
      roomType: { type: String },
      totalNights: { type: Number },
      cities: [{ type: String }]
    },
    transport: {
      mode: { type: String },
      fuelIncluded: { type: Boolean, default: true },
      driver: { type: Boolean, default: true },
      airportTransfers: { type: Boolean, default: false }
    },
    includes: [{
      type: String
    }],
    excludes: [{
      type: String
    }],
    idealFor: [{
      type: String
    }],
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
PackageSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = (this.title as string)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Index for search
PackageSchema.index({ title: 'text', description: 'text' });

export default mongoose.model<IPackage>('Package', PackageSchema);

