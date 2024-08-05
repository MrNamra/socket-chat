const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const regitserLoad = async(req, res)=>{
    try{
        res.render('register')
    }catch(err){
        console.log(err);
    }
}
const regitser = async(req, res)=>{
    try{
        const HasPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            image: 'img/' + req.file.filename,
            password: HasPassword,
        })

        await user.save()
        res.render('register', {message: 'Registation Successfully!'})

    }catch(err){
        console.log(err);
    }
}
const loadLogin = async(req, res)=>{
    try{
        res.render('login')
    }catch(err){
        console.log(err);
    }
}
const login = async(req, res)=>{
    try{
        const password = req.body.password
        const email = req.body.email

        const userData = await User.findOne({ email: email })
        if(userData){
            const isMatch = await bcrypt.compare(password, userData.password)
            console.log("ismatch:", isMatch)
            if (isMatch){
                req.session.user = userData;
                res.redirect('/dashboard')
            }
        }
        
        res.render('login', {message: 'email or password not match!'})
        
    }catch(err){
        console.log(err);
    }
}
const logout = async(req, res)=>{
    try{
        req.session.destroy()
        res.redirect('/')
    }catch(err){
        console.log(err);
    }
}
const dashboard = async(req, res)=>{
    try{
        res.render('dashboard', { user: req.session.user     })
    }catch(err){
        console.log(err);
    }
}
module.exports = { regitser, regitserLoad, loadLogin, login, dashboard, logout }