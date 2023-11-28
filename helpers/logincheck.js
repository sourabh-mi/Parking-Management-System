function logincheck(req,res,next){
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/')
    }
}
module.exports=logincheck