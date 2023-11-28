const Reg=require('../models/reg')


exports.loginform=(req,res)=>{
    res.render('login.ejs',{message:''})
}
exports.logincheck=async(req,res)=>{
    const{us,pass}=req.body
    const record=await Reg.findOne({username:us})
    if(record!==null){
        if(record.password==pass){
            req.session.username=us
            req.session.isAuth=true
        
        res.redirect('/dashboard')
        }else{
            res.render('/login.ejs',{message:'Wrong Credentials'})
        }
    }else{
        res.render('login.ejs',{message:'Wrong Credentials'})
    }
    
}
exports.dashboardform=(req,res)=>{
    const username=req.session.username
    res.render('dashboard.ejs',{username})
}
exports.logout=(req,res)=>{
    req.session.destroy()
    res.redirect('/')
}




