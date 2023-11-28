const parking=require('../models/parking')



exports.addform=(req,res)=>{
    const username=req.session.username
    res.render('addform.ejs',{username,message:""})   
}
exports.parkinginsert=(req,res)=>{
    const{vno,vtype}=req.body
    const record=new parking({vno:vno,vtype:vtype})
    record.save()
    const username=req.session.username
    res.render('addform.ejs',{username,message:"successfully added"})
}
exports.selection=async(req,res)=>{
    const record=await parking.find().sort({status:-1})
    const parked=await parking.find({status:'Parked'})
   const username=req.session.username
    res.render('out.ejs',{username,record,parked})
}
exports.parkingupdate=async(req,res)=>{
    const id=req.params.id
    let outtime=new Date()
    const record=await parking.findById(id)
    let totalTimeSpend=((outtime-record.vin)/(1000*60*60))
    //console.log(totalTimeSpend)
    let amount=null
    if(record.vtype='2w'){
amount=totalTimeSpend*30
    }else if(record.vtype='3w'){
        amount=totalTimeSpend*50
    }else if(record.vtype='4w'){
        amount=totalTimeSpend*80
}else if(record.vtype='hw'){
    amount=totalTimeSpend*150
}else if(record.vtype='lw'){
    amount=totalTimeSpend*120
}else{
    amount=totalTimeSpend*50
}if(amount<=20){
    amount=20
}
await parking.findByIdAndUpdate(id,{vout:outtime,amount:Math.round(amount),status:'OUT'})
res.redirect('/out')
}

exports.print=async(req,res)=>{
    const id=req.params.id
    const record=await parking.findById(id)
    res.render('print.ejs',{record})
}

exports.search=async(req,res)=>{
    const{search}=req.body
    const record=await parking.find({vno:search}).sort({status:-1})
    const parked=await parking.find({status:'Parked'})
   const username=req.session.username
    res.render('out.ejs',{username,record,parked})
}