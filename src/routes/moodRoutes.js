import express from 'express';
import { trackMood, getMoodHistory } from '../controllers/moodController.js';

const router = express.Router();

router.post('/', trackMood);
router.get('/', getMoodHistory);

export default router;
