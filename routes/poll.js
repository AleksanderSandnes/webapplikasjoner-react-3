import express from 'express';
import { pollController } from '../controllers/index.js';

const router = express.Router();

router.get('/:id', pollController.get);
router.get('/', pollController.list);
router.post('/', pollController.create);
router.put('/:id', pollController.update);
router.delete('/:id', pollController.remove);

export default router;