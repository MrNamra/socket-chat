const express = require('express')
const user_route = express();
const bodyparser = require('body-parser')
const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')
var session = require('express-session')
const { SESSION_SECRET } = process.env
user_route.use(session({ 
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

user_route.use(bodyparser.json())
user_route.use(bodyparser.urlencoded({extended:true}))

user_route.set('view engine', 'ejs')
user_route.set('views', './views')

user_route.use(express.static('./public'));

const path = require('path')
const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req, res, cb){
        cb(null, path.join(__dirname, '../public/img'));
    },
    filename:function(req, file, cb){
        const name = Date.now()+ '-' +file.originalname
        cb(null, name)
    }
})

const upload = multer({ storage:storage })

user_route.get('/register', auth.isLogout, userController.regitserLoad)
user_route.post('/register', auth.isLogout, upload.single('image'), userController.regitser)

user_route.get('/', auth.isLogout, userController.loadLogin)
user_route.post('/', auth.isLogout, userController.login)
user_route.get('/logout', auth.isLogin, userController.logout)

user_route.get('/dashboard', auth.isLogin, userController.dashboard)

user_route.get('*', function(req,res){
    res.redirect('/');
})

module.exports = user_route