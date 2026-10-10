import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  type: { type: String, enum: ['project','service','gallery','testimonial','blog','team'], required: true },
  title: { type: String, required: true, trim: true },
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { versionKey: false });

contentSchema.pre('save', function(next) { this.updatedAt = new Date(); next(); });
export default mongoose.model('Content', contentSchema);
