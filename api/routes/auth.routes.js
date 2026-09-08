import { Router } from 'express';
import { login, verify2FA, generate2FA, updatePassword } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', login);
router.post('/verify-2fa', verify2FA);
router.post('/generate-2fa', generate2FA);
router.put('/update-password', updatePassword);

export default router;
