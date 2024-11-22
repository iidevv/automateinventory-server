import { Router } from 'express';
import { createUser, loginUser } from '../controllers/authController';
import { authenticateJWT } from '../config/passport';

const router = Router();

router.post('/login', async (req, res) => {
    try {
        await loginUser(req, res);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err });
    }
});

router.post('/create-account', async (req, res) => {
    try {
        await createUser(req, res);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err });
    }
});

// Protected route that requires authentication
router.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});


export default router;