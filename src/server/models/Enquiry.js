import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    city: { type: String, trim: true },
    service: { type: String, trim: true },
    message: { type: String, trim: true },
    source: { type: String, enum: ['contact-form', 'cost-calculator'], default: 'contact-form' },
    propertyType: { type: String, trim: true },
    area: { type: Number },
    quality: { type: String, trim: true },
    estimatedLower: { type: Number },
    estimatedUpper: { type: Number },
    status: { type: String, enum: ['new', 'contacted', 'discussion', 'site-visit', 'converted', 'closed'], default: 'new' }
  },
  { timestamps: true }
);

export default mongoose.model('Enquiry', enquirySchema);
