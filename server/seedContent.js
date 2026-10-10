import ContentItem from './models/ContentItem.js';

const seed = [
  { type: 'service', title: 'Residential Interiors', description: 'Complete home interiors designed around your lifestyle, space and budget.', meta: { icon: '⌂' }, order: 1 },
  { type: 'service', title: 'Commercial Interiors', description: 'Functional, polished spaces for offices, studios, retail and commercial projects.', meta: { icon: '▦' }, order: 2 },
  { type: 'service', title: 'Modular Kitchens', description: 'Smart storage, practical layouts and refined finishes made for everyday living.', meta: { icon: '◇' }, order: 3 },
  { type: 'service', title: 'Custom Furniture', description: 'Wardrobes, TV units, beds and furniture planned to fit your room perfectly.', meta: { icon: '▱' }, order: 4 },
  { type: 'service', title: 'Bedroom Design', description: 'Calm, practical bedrooms with storage, lighting and finishes planned as one composition.', meta: { icon: '◌' }, order: 5 },
  { type: 'service', title: 'Living Room Design', description: 'Elegant living spaces that balance comfort, movement, lighting and personality.', meta: { icon: '◇' }, order: 6 },
  { type: 'project', title: 'Modern Living Room', category: 'Residential', location: 'Indirapuram', description: 'Warm textures, clean lines and layered lighting for everyday living.', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=88', order: 1 },
  { type: 'project', title: 'Warm Modular Kitchen', category: 'Residential', location: 'Vaibhav Khand', description: 'Smart storage and a warm material palette built for daily use.', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=88', order: 2 },
  { type: 'project', title: 'Contemporary Workspace', category: 'Commercial', location: 'Ghaziabad', description: 'A focused workplace with natural light, clean planning and flexible zones.', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=88', order: 3 },
  { type: 'project', title: 'Quiet Bedroom Suite', category: 'Residential', location: 'Noida', description: 'Soft neutrals, concealed storage and a calm evening lighting scheme.', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=88', order: 4 },
  { type: 'gallery', title: 'Living Room', image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=88', category: 'Living', order: 1 },
  { type: 'gallery', title: 'Kitchen', image: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=88', category: 'Kitchen', order: 2 },
  { type: 'gallery', title: 'Bedroom', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=88', category: 'Bedroom', order: 3 },
  { type: 'gallery', title: 'Workspace', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=88', category: 'Office', order: 4 },
  { type: 'gallery', title: 'Dining', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=88', category: 'Dining', order: 5 },
  { type: 'testimonial', title: 'Aditi Sharma', description: 'The team understood our lifestyle and turned a plain apartment into a warm, practical home. The planning was clear from the beginning.', meta: { role: 'Homeowner', rating: 5 }, order: 1 },
  { type: 'testimonial', title: 'Rohan Mehta', description: 'We wanted a professional office without making it feel cold. Ivy Interio balanced both beautifully and kept the execution organised.', meta: { role: 'Business Owner', rating: 5 }, order: 2 },
  { type: 'testimonial', title: 'Neha Kapoor', description: 'The kitchen and wardrobe storage were planned really well. Everything feels intentional and easy to use.', meta: { role: 'Homeowner', rating: 5 }, order: 3 },
  { type: 'blog', title: 'How to plan a modern home interior', description: 'A practical guide to space planning, materials, lighting and budgeting before you begin.', meta: { readTime: '5 min read' }, order: 1 },
  { type: 'blog', title: 'Kitchen storage ideas that actually work', description: 'Simple planning principles that make a modular kitchen more comfortable every day.', meta: { readTime: '4 min read' }, order: 2 },
  { type: 'blog', title: 'Warm minimalism for Indian homes', description: 'How to combine neutral colours, wood, texture and lighting without making a space feel flat.', meta: { readTime: '6 min read' }, order: 3 }
];

export async function seedContent() {
  const count = await ContentItem.countDocuments();
  if (count > 0) return;
  await ContentItem.insertMany(seed);
  console.log(`Seeded ${seed.length} Ivy Interio content items`);
}
