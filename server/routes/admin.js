import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Enquiry from '../models/Enquiry.js';
import auth from '../middleware/auth.js';

const router = Router();
const statuses = ['new', 'contacted', 'discussion', 'site-visit', 'converted', 'closed'];

router.post('/login', async (req, res) => {
  const { email = '', password = '' } = req.body;
  if (!process.env.ADMIN_EMAIL || !process.env.JWT_SECRET || (!process.env.ADMIN_PASSWORD && !process.env.ADMIN_PASSWORD_HASH)) {
    return res.status(500).json({ error: 'Admin authentication is not configured on the server.' });
  }
  if (email.trim().toLowerCase() !== process.env.ADMIN_EMAIL.trim().toLowerCase()) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }
  const hashMatch = process.env.ADMIN_PASSWORD_HASH
    ? await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH).catch(() => false)
    : false;
  const plainMatch = !process.env.ADMIN_PASSWORD_HASH && password === process.env.ADMIN_PASSWORD;
  if (!hashMatch && !plainMatch) return res.status(401).json({ error: 'Invalid email or password.' });
  const token = jwt.sign({ role: 'admin', email: process.env.ADMIN_EMAIL }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, admin: { email: process.env.ADMIN_EMAIL, role: 'admin' } });
});

router.get('/me', auth, (req, res) => res.json({ admin: req.admin }));

router.get('/enquiries', auth, async (_req, res) => {
  try { res.json({ enquiries: await Enquiry.find().sort({ createdAt: -1 }).lean() }); }
  catch (error) { console.error(error); res.status(500).json({ error: 'Could not load enquiries.' }); }
});

router.get('/stats', auth, async (_req, res) => {
  try {
    const [total, newCount, calculatorCount, contactCount, converted] = await Promise.all([
      Enquiry.countDocuments(), Enquiry.countDocuments({ status: 'new' }),
      Enquiry.countDocuments({ source: 'cost-calculator' }), Enquiry.countDocuments({ source: 'contact-form' }),
      Enquiry.countDocuments({ status: 'converted' })
    ]);
    res.json({ total, newCount, calculatorCount, contactCount, converted });
  } catch (error) { console.error(error); res.status(500).json({ error: 'Could not load dashboard stats.' }); }
});

router.patch('/enquiries/:id/status', auth, async (req, res) => {
  if (!statuses.includes(req.body.status)) return res.status(400).json({ error: 'Invalid status.' });
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).lean();
    if (!enquiry) return res.status(404).json({ error: 'Enquiry not found.' });
    res.json({ enquiry });
  } catch (error) { console.error(error); res.status(500).json({ error: 'Could not update enquiry.' }); }
});

router.delete('/enquiries/:id', auth, async (req, res) => {
  try {
    const result = await Enquiry.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Enquiry not found.' });
    res.json({ ok: true });
  } catch (error) { console.error(error); res.status(500).json({ error: 'Could not delete enquiry.' }); }
});

export default router;
