import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, maxlength: 120 },
    city: { type: String, trim: true, maxlength: 120 },
    service: { type: String, trim: true, maxlength: 120 },
    message: { type: String, trim: true, maxlength: 2000 },
    source: { type: String, enum: ['contact-form', 'cost-calculator'], required: true },
    propertyType: { type: String, trim: true, maxlength: 50 },
    area: { type: Number, min: 0 },
    quality: { type: String, trim: true, maxlength: 50 },
    estimatedLower: { type: Number, min: 0 },
    estimatedUpper: { type: Number, min: 0 },
    status: {
      type: String,
      enum: ['new', 'contacted', 'discussion', 'site-visit', 'converted', 'closed'],
      default: 'new'
    }
  },
  { timestamps: true }
);

enquirySchema.index({ createdAt: -1 });
enquirySchema.index({ phone: 1 });
enquirySchema.index({ status: 1 });

enquirySchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model('Enquiry', enquirySchema);
