var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

/* GET home page. */
router.post('/submit_subcategory',upload.single('picture'), function(req, res, next) {
  try{
    pool.query("insert into subcategory (categoryid,subcategoryname,picture) values(?,?,?)",[req.body.categoryid,req.body.subcategoryname,req.file.filename],function(error,result){
     if(error)
     {  console.log(error)
         res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
     else
     {
        res.status(200).json({status:true,message:'Subcategory Submitted Successfully...'})

     }
    
    })


  }
  catch(e)
  {
    console.log('Error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
  }

});


router.get('/display_all_subcategory',function(req,res){
  pool.query("select S.*,(select C.categoryname from category C where C.categoryid=S.categoryid) as categoryname from subcategory S",function(error,result){
    try
    {
      if(error)
      {
        res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})
      }
      else
      {
        res.status(200).json({status:true,message:'Success',data:result})
      }
    }
    catch(e)
    {
      res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
    }
  })


});



router.post('/edit_subcategory_data',function(req, res, next) {
  try{
    pool.query("update subcategory set categoryid=?, subcategoryname=? where subcategoryid=?",[req.body.categoryid,req.body.subcategoryname,req.body.subcategoryid],function(error,result){
     if(error)
     {  console.log(error)
         res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
     else
     {
        res.status(200).json({status:true,message:'Subcategory Updated successfully'})

     }
    
    })



  }
  catch(e)
  {
    console.log('Error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
  }

});


router.post('/edit_subcategory_picture',upload.single('picture'), function(req, res, next) {
  try{
    pool.query("update subcategory set picture=? where subcategoryid=?",[req.file.filename,req.body.subcategoryid],function(error,result){
     if(error)
     {  console.log(error)
         res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
     else
     {
        res.status(200).json({status:true,message:'Picture Updated Successfully...'})

     }
    
    })



  }
  catch(e)
  {
    console.log('Error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
  }

});




router.post('/delete_subcategory_data', function(req, res, next) {
  try{
    pool.query("delete from subcategory where subcategoryid=?",[req.body.subcategoryid],function(error,result){
     if(error)
     {  console.log(error)
         res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
     else
     {
        res.status(200).json({status:true,message:'Subcategory Deleted Successfully...'})

     }
    
    })



  }
  catch(e)
  {
    console.log('Error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
  }

});



router.post('/fetch_all_subcategory_by_categoryid',function(req,res){
  try{
    pool.query("select * from subcategory where categoryid=?",[req.body.categoryid],function(error,result){
     if(error)
     {  console.log(error)
         res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
     else
     {
        res.status(200).json({status:true,message:'Success',data:result})

     }
    
    })

 }
  catch(e)
  {
    console.log('Error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
  }

    
})  




module.exports = router;