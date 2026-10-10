import mongoose from 'mongoose';

const contentItemSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['service', 'project', 'gallery', 'testimonial', 'blog', 'team'], required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 160 },
    description: { type: String, trim: true, maxlength: 2000 },
    image: { type: String, trim: true, maxlength: 1000 },
    category: { type: String, trim: true, maxlength: 100 },
    location: { type: String, trim: true, maxlength: 120 },
    meta: { type: mongoose.Schema.Types.Mixed, default: {} },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

contentItemSchema.index({ type: 1, order: 1, createdAt: -1 });

export default mongoose.model('ContentItem', contentItemSchema);
