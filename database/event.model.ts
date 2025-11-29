import mongoose, { Schema, Document, Model, HydratedDocument } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: 'online' | 'offline' | 'hybrid';
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [1, 'Title cannot be empty'],
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [1, 'Description cannot be empty'],
    },
    overview: {
      type: String,
      required: [true, 'Overview is required'],
      trim: true,
      minlength: [1, 'Overview cannot be empty'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
      trim: true,
      minlength: [1, 'Image URL cannot be empty'],
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
      trim: true,
      minlength: [1, 'Venue cannot be empty'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      minlength: [1, 'Location cannot be empty'],
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
    },
    mode: {
      type: String,
      enum: ['online', 'offline', 'hybrid'],
      required: [true, 'Mode is required'],
    },
    audience: {
      type: String,
      required: [true, 'Audience is required'],
      trim: true,
      minlength: [1, 'Audience cannot be empty'],
    },
    agenda: {
      type: [String],
      required: [true, 'Agenda is required'],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: 'Agenda must be a non-empty array',
      },
    },
    organizer: {
      type: String,
      required: [true, 'Organizer is required'],
      trim: true,
      minlength: [1, 'Organizer cannot be empty'],
    },
    tags: {
      type: [String],
      required: [true, 'Tags are required'],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: 'Tags must be a non-empty array',
      },
    },
  },
  { timestamps: true }
);

// Pre-save hook: Generate slug from title and normalize date/time
eventSchema.pre<IEvent>('save', function (this: HydratedDocument<IEvent>, next: (err?: Error) => void) {
  // Generate slug from title only if title is changed or slug is missing
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  }

  // Normalize date to ISO format (YYYY-MM-DD)
  if (this.date) {
    const dateObj = new Date(this.date);
    if (!isNaN(dateObj.getTime())) {
      this.date = dateObj.toISOString().split('T')[0];
    }
  }

  // Normalize time to HH:mm format
  if (this.time) {
    const timeMatch = this.time.match(/^(\d{1,2}):?(\d{2})(?::(\d{2}))?/);
    if (timeMatch) {
      const hours = String(parseInt(timeMatch[1], 10)).padStart(2, '0');
      const minutes = String(parseInt(timeMatch[2], 10)).padStart(2, '0');
      this.time = `${hours}:${minutes}`;
    }
  }

  next();
});

// Index on slug for faster lookups
eventSchema.index({ slug: 1 });

export const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);
