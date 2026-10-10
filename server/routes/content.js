import { Router } from 'express';
import ContentItem from '../models/ContentItem.js';
import auth from '../middleware/auth.js';

const router = Router();
const types = ['service', 'project', 'gallery', 'testimonial', 'blog', 'team'];

router.get('/', async (req, res) => {
  try {
    const type = String(req.query.type || '').trim();
    const filter = { active: true };
    if (type && types.includes(type)) filter.type = type;
    const items = await ContentItem.find(filter).sort({ order: 1, createdAt: -1 }).lean();
    res.json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not load content.' });
  }
});

router.get('/admin', auth, async (req, res) => {
  try {
    const type = String(req.query.type || '').trim();
    const filter = type && types.includes(type) ? { type } : {};
    res.json({ items: await ContentItem.find(filter).sort({ type: 1, order: 1, createdAt: -1 }).lean() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not load content.' });
  }
});

router.post('/admin', auth, async (req, res) => {
  try {
    const { type, title } = req.body || {};
    if (!types.includes(type)) return res.status(400).json({ error: 'Invalid content type.' });
    if (!String(title || '').trim()) return res.status(400).json({ error: 'Title is required.' });
    const item = await ContentItem.create(req.body);
    res.status(201).json({ item });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Could not create content item.' });
  }
});

router.patch('/admin/:id', auth, async (req, res) => {
  try {
    const item = await ContentItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
    if (!item) return res.status(404).json({ error: 'Content item not found.' });
    res.json({ item });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Could not update content item.' });
  }
});

router.delete('/admin/:id', auth, async (req, res) => {
  try {
    const result = await ContentItem.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Content item not found.' });
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Could not delete content item.' });
  }
});

export default router;
