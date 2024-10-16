var express = require('express');
var router = express.Router();

/* GET users listing. */
var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

/* GET home page. */
router.post('/submit_user', function(req, res, next) {
  try{
    pool.query("insert into userdata (mobileno,emailid,username) values(?,?,?)",[req.body.mobileno,req.body.emailid,req.body.username],function(error,result){
     if(error)
     {  console.log(error)
         res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
     else
     {
        res.status(200).json({status:true,message:'User Submitted Successfully...'})

     }
    
    })


  }
  catch(e)
  {
    console.log('Error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
  }

});

router.post('/check_userdata', function(req, res, next) {
  try{
    pool.query("select * from userdata where mobileno=?",[req.body.mobileno],function(error,result){
     if(error)
     {  console.log(error)
         res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
     else
     {  if(result.length==1)
        res.status(200).json({status:true,data:result[0],message:'User found...'})
        else
        res.status(200).json({status:false,data:[],message:'User found...'})
     }
    
    })


  }
  catch(e)
  {
    console.log('Error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
  }

});



router.post('/check_user_address', function(req, res, next) {
  try{
 
    pool.query("select * from address where mobileno=?",[req.body.mobileno],function(error,result){
     if(error)
     {  console.log(error)
         res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
     else
     {  
      if(result.length>=1)
        res.status(200).json({status:true,data:result,message:'User found...'})
        else
        res.status(200).json({status:false,data:[],message:'User found...'})
     }
     
    
    })


  }
  catch(e)
  {
    console.log('Error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
  }

});

router.post('/submit_user_address', function(req, res, next) {
  try{
    pool.query("insert into address (mobileno,address,landmark,pincode,state,city) values(?,?,?,?,?,?)",[req.body.mobileno,req.body.address,req.body.landmark,req.body.pincode,req.body.state,req.body.city],function(error,result){
     if(error)
     {  console.log(error)
         res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
     else
     {
        res.status(200).json({status:true,message:'User Address Submitted Successfully...'})

     }
    
    })


  }
  catch(e)
  {
    console.log('Error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
  }

});


router.post('/save_order', function(req, res, next) {
  try{
    console.log("user",req.body)
    pool.query("insert into orders (userid,mobileno,emailid,orderdate,paymentstatus,paymentid) values(?,?,?,?,?,?)",[req.body.userid,req.body.mobileno,req.body.emailid,new Date().toString(),req.body.paymentstatus,req.body.paymentid],function(error,result){
     if(error)
     {  console.log(error)
         res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
     else
     {  
       
        console.log(result)
        pool.query("insert into orderdetails (orderid, productdetailid, price, offerprice, qty) values ?",[req.body.orderlist?.map((item)=>{
        return [result.insertId,item.productdetailid,item.price,item.offerprice,item.qty]})


        ],function(error,result){
          if(error)
          {  console.log(error)
              res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
          else
          {  
             res.status(200).json({status:true,message:'Order Submitted Succesfully...'})
          }

        }) 
        

     }
    
    })



  }
  catch(e)
  {
    console.log('Error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
  }

});



router.get('/display_order',function(req,res,next){
  try
  {
    pool.query("select * from orders",function(error,result){
     
          if (error)
          {  console.log(error)
              res.status(200).json({status:false,message:'Server Error Pls Contact Database Administrator....'})
          }
          else
      { console.log(result)
              res.status(200).json({status:true,message:'Success',data:result})
          }
      })
  }
  catch(e)
  {
      res.status(200).json({status:false,message:'Server Error : Pls Contact Server Administrator..... '})
  }

})



router.post('/display_orderdetails',function(req,res,next){
  try
  {
    pool.query("select  OD.*,PD.*,(select P.picture from products P where P.productid=PD.productid) as picture from orderdetails OD, productdetails PD where OD.productdetailid=PD.productdetailid and OD.orderid=?",[req.body.orderid],function(error,result){
     
          if (error)
          {  console.log(error)
              res.status(200).json({status:false,message:'Server Error Pls Contact Database Administrator....'})
          }
          else
      { console.log(result)
              res.status(200).json({status:true,message:'Success',data:result})
          }
      })
  }
  catch(e)
  {
      res.status(200).json({status:false,message:'Server Error : Pls Contact Server Administrator..... '})
  }

})


module.exports = router;
