import express from 'express';
import { createInterview, getInterview} from '../controllers/interviewController.js';
import protect  from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createInterview);
router.get('/:id', protect, getInterview);

export default router;