import { Router } from 'express';
import mongoose from 'mongoose';
import Enquiry from '../models/Enquiry.js';

const router = Router();

function cleanPhone(value = '') {
  return String(value).replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
}

function cleanText(value = '', max = 1000) {
  return String(value).trim().slice(0, max);
}

router.post('/', async (req, res) => {
  const {
    name = '', phone = '', email = '', city = '', service = '', message = '',
    source = 'contact-form', propertyType = '', area, quality = '',
    estimatedLower, estimatedUpper
  } = req.body || {};

  const allowedSources = ['contact-form', 'cost-calculator'];
  if (!allowedSources.includes(source)) return res.status(400).json({ error: 'Invalid enquiry source.' });
  if (cleanText(name, 80).length < 2) return res.status(400).json({ error: 'Please enter your name.' });

  const mobile = cleanPhone(phone);
  if (!/^[6-9]\d{9}$/.test(mobile)) {
    return res.status(400).json({ error: 'Please enter a valid 10-digit Indian mobile number.' });
  }

  const cleanEmail = cleanText(email, 120).toLowerCase();
  if (cleanEmail && !/^\S+@\S+\.\S+$/.test(cleanEmail)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'Database is not connected. Please try again shortly.' });
  }

  try {
    const enquiry = await Enquiry.create({
      name: cleanText(name, 80),
      phone: mobile,
      email: cleanEmail,
      city: cleanText(city, 120),
      service: cleanText(service, 120),
      message: cleanText(message, 2000),
      source,
      propertyType: cleanText(propertyType, 50),
      area: Number.isFinite(Number(area)) && Number(area) > 0 ? Number(area) : undefined,
      quality: cleanText(quality, 50),
      estimatedLower: Number.isFinite(Number(estimatedLower)) ? Number(estimatedLower) : undefined,
      estimatedUpper: Number.isFinite(Number(estimatedUpper)) ? Number(estimatedUpper) : undefined
    });

    res.status(201).json({ ok: true, id: enquiry._id, message: 'Enquiry received successfully.' });
  } catch (error) {
    console.error('Enquiry error:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

export default router;
