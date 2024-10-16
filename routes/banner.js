var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

/* GET home page. */
router.post('/submit_banner',upload.any(), function(req, res, next) {
  try{
    var files= req.files.map((item)=>{
        
        return item.filename
      })

    pool.query("insert into banners (bannertype,brandid,picture) values(?,?,?)",[req.body.bannertype,req.body.brandid,files+""],function(error,result){
     if(error)
     {  
         res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
     else
     { 
        res.status(200).json({status:true,message:'Banner Submitted Successfully...',data:result})

     }
    
    })



  }
  catch(e)
  {
    
    res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
  }

});


module.exports = router;