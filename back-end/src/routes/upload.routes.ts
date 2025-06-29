import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import createUploader from '../middleware/upload';

const router = Router();
const upload = createUploader('images');

router.post('/', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const imageUrl = `/uploads/images/${req.file.filename}`;
  res.json({ imageUrl });
});

export default router;
