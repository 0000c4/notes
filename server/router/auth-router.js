const Router = require('express').Router;
const UserController = require('../controllers/user-controller')
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')
const router = new Router();

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min:2,max:32}),

    UserController.registration
    );
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);

router.post('/reset', UserController.resetPassword);
router.put('/reset', UserController.sendResetPassword);
router.get('/reset/:link', (req,res)=>{
    res.sendFile('C:/Users/vasja/coding/notes/server/static/resetPassword/index.html')
});

module.exports = router