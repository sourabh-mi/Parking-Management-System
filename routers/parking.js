const router=require('express').Router()
const Regc=require('../controllers/regcontroller')
const logincheck=require('../helpers/logincheck')
const parC=require('../controllers/parkingcontroller')


router.get('/',Regc.loginform)
router.post('/',Regc.logincheck)
router.get('/dashboard',logincheck,Regc.dashboardform)
router.get('/logout',Regc.logout)
router.get('/add',parC.addform)
router.post('/add',parC.parkinginsert)
router.get('/out',parC.selection)
router.get('/parkingupdate/:id',parC.parkingupdate)
router.get('/print/:id',parC.print)
router.post('/out',parC.search)
module.exports=router;