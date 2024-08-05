const isLogin = async (req, res, next) => {
    try{
        if(req.session.user){
        }else{
            res.redirect('/')
        }
        next()
    }catch(Err){
        console.log(err);
    }
}

const isLogout = async (req, res, next) => {
    try{
        if(req.session.user){
            res.redirect('/dashboard')
        }
        next()
    }catch(Err){
        console.log(err);
    }
}

module.exports= { 
    isLogin,
    isLogout 
}