import { Router } from 'express';
import { signupPost, loginPost } from '../controllers'
import { requireAuth, authRedirect } from '../middleware/authentication';

const router = Router();

router.get('/signup', (req, res) => {
    res.render('signup');
});
router.get('/login', authRedirect, (req, res) => {
    res.render('login');
});
router.get('/smoothies', requireAuth, (req, res) => {
    res.render('smoothies');
})

router.post('/signup', signupPost);
router.post('/login', loginPost);

export default router;