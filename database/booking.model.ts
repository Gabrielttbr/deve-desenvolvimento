import mongoose, { Schema, Document, Model, HydratedDocument, Types } from 'mongoose';
import { Event } from './event.model';

export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
  },
  { timestamps: true }
);

// Index on eventId for faster queries
bookingSchema.index({ eventId: 1 });

// Pre-save hook: Verify referenced eventId exists in Event collection
bookingSchema.pre<IBooking>('save', async function (this: HydratedDocument<IBooking>, next: (err?: Error) => void) {
  try {
    // Only validate if eventId is modified
    if (this.isModified('eventId')) {
      const eventExists = await Event.findById(this.eventId);
      if (!eventExists) {
        throw new Error(`Event with ID ${this.eventId} does not exist`);
      }
    }
    next();
  } catch (error) {
    next(error instanceof Error ? error : new Error('Validation error'));
  }
});

export const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);
