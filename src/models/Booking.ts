import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  bookingType: 'tour' | 'package';
  itemId: mongoose.Types.ObjectId;
  itemTitle: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  travelers: number;
  packageType: 'solo' | 'couple' | 'deluxe' | 'standard';
  totalPrice: number;
  message?: string;
  travelDate?: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    bookingType: {
      type: String,
      enum: ['tour', 'package'],
      required: [true, 'Booking type is required']
    },
    itemId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Item ID is required'],
      refPath: 'bookingType'
    },
    itemTitle: {
      type: String,
      required: [true, 'Item title is required']
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },
    customerEmail: {
      type: String,
      required: [true, 'Customer email is required'],
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    customerPhone: {
      type: String,
      required: [true, 'Customer phone is required'],
      trim: true
    },
    travelers: {
      type: Number,
      required: [true, 'Number of travelers is required'],
      min: [1, 'At least 1 traveler is required']
    },
    packageType: {
      type: String,
      enum: ['solo', 'couple', 'deluxe', 'standard'],
      default: 'solo'
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Price cannot be negative']
    },
    message: {
      type: String,
      maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    travelDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending'
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'partial', 'paid'],
      default: 'unpaid'
    },
    notes: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Generate booking reference
BookingSchema.virtual('bookingRef').get(function() {
  return `BK-${this.id.toString().slice(-8).toUpperCase()}`;
});

// Ensure virtuals are included in JSON
BookingSchema.set('toJSON', { virtuals: true });
BookingSchema.set('toObject', { virtuals: true });

export default mongoose.model<IBooking>('Booking', BookingSchema);

