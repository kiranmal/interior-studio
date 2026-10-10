import { Router } from 'express';
import mongoose from 'mongoose';
import Enquiry from '../models/Enquiry.js';

const router = Router();

function cleanPhone(value = '') {
  return String(value).replace(/\s|-|\+91/g, '');
}

router.post('/', async (req, res) => {
  const {
    name = '',
    phone = '',
    email = '',
    city = '',
    service = '',
    message = '',
    source = 'contact-form',
    propertyType = '',
    area,
    quality = '',
    estimatedLower,
    estimatedUpper
  } = req.body;

  if (String(name).trim().length < 2) {
    return res.status(400).json({ error: 'Please enter your name.' });
  }

  if (!/^[6-9]\d{9}$/.test(cleanPhone(phone))) {
    return res.status(400).json({ error: 'Please enter a valid 10-digit mobile number.' });
  }

  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  try {
    const payload = {
      name: String(name).trim(),
      phone: cleanPhone(phone),
      email: String(email).trim(),
      city: String(city).trim(),
      service: String(service).trim(),
      message: String(message).trim(),
      source,
      propertyType: String(propertyType).trim(),
      area: area ? Number(area) : undefined,
      quality: String(quality).trim(),
      estimatedLower: estimatedLower ? Number(estimatedLower) : undefined,
      estimatedUpper: estimatedUpper ? Number(estimatedUpper) : undefined
    };

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database is not connected. Please try again shortly.' });
    }

    const enquiry = await Enquiry.create(payload);

    return res.status(201).json({ ok: true, id: enquiry._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

export default router;
