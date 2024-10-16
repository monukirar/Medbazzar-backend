var express = require('express');
var router = express.Router();
var pool=require('./pool')

router.post('/show_all_banners',function(req,res){
    try{
      pool.query("select * from banners where bannertype=?",[req.body.bannertype],function(error,result){
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



  router.get('/show_all_brands',function(req,res){
    try{
      pool.query("select * from brands where brandid!=0",function(error,result){
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


router.get('/display_all_category',function(req,res){
    try{
      pool.query("select * from category",function(error,result){
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

  router.post('/fetch_all_subcategory_by_categoryid',function(req,res,next){
    try
    {
        pool.query("select * from subcategory where categoryid=?",[req.body.categoryid],function(error,result){
            if(error)
            {
                res.status(200).json({status:false,message:'Server Error: Pls Contact to Database Administrator......'}) 
            }
            else
            {
                res.status(200).json({status:true,message:'Success',data:result})
            }
        })
    }
    catch(e)
    {
        res.status(200).json({status:false,message:'Server Error: Pls Contact to Database Administrator......'}) 
    }
})


router.post('/display_all_productdetail_by_offer',function(req,res,next){
  try
  {
      pool.query("select P.*,PR.*,P.picture as multi_picture, P.description as pd_description,(select C.categoryname from category C where C.categoryid=P.categoryid )as categoryname, (select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select B.brandname from brands B where B.brandid=P.brandid)as brandname,(select Con.concernname from concern Con where Con.concernid=P.concernid)as concernname from productdetails P,products PR  where P.productid=PR.productid and P.offertype=?",[req.body.offertype],function(error,result){
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


router.get('/display_all_concern',function(req,res){
  try{
    pool.query("select * from concern",function(error,result){
     if(error)
     {  console.log(error)
         res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
     else
     {  console.log(result)
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


router.get('/display_all_brand',function(req,res){
  try
  {
    pool.query("select * from brands where brandid!=0",function(error,result){
      if(error)
      {
        console.log(error)       
          res.status(200).json({status:false,message:'Server Error:Pls Contact Database.....'})
      }
      else
        {
          res.status(200).json({status:true,message:'Success',data:result}) 
          
        }

    })
  }
  catch(e)
  {
    res.status(200).json({status:false,message:'Server Error:Pls Contact Database.....'})
  }
});


router.post(
  "/display_all_productdetail_by_category",
  function (req, res, next) {
    try {
      console.log("Filter", req.body);
      
var q="select P.*,PR.*,P.picture as multi_picture, P.description as pd_description,(select C.categoryname from category C where C.categoryid=P.categoryid )as categoryname, (select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select B.brandname from brands B where B.brandid=P.brandid)as brandname,(select Con.concernname from concern Con where Con.concernid=P.concernid)as concernname from productdetails P,products PR  where (P.productid=PR.productid) and (P.categoryid="+req.body.categoryid+" or PR.productname  like '%"+req.body.pattern+"%')"
      console.log(q)
      pool.query(q,
        function (error, result) {
          if (error) {
            console.log(error);
            res
              .status(200)
              .json({
                status: false,
                message: "Server Error Pls Contact Database Administrator....",
              });
          } else {
            console.log(result);
            res
              .status(200)
              .json({ status: true, message: "Success", data: result });
          }
        }
      );
    } catch (e) {
      res
        .status(200)
        .json({
          status: false,
          message: "Server Error : Pls Contact Server Administrator..... ",
        });
    }
  }
);



module.exports=router  