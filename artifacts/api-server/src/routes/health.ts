import { Router } from 'express';

const router = Router();

// مسار تجريبي للتحقق من أن السيرفر يعمل
router.get('/', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running smoothly!' });
});

export default router;
