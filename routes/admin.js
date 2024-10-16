var express = require('express');
var router = express.Router();
var pool=require('./pool')

const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

/* GET home page. */
router.post('/check_admin_login',function(req, res, next) {
  
    pool.query("select * from admins where emailid=? and password=?",[req.body.emailid,req.body.password ],function(error,result){
     if(error)
     {  console.log(error)
         res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})
     }
     else
     {
        if(result.length==1)
        {    let jwtSecretkey = process.env.JWT_SECRET_KEY

            const token = jwt.sign({user:result[0]},jwtSecretkey  , {
                expiresIn:  '1h',
            })
        res.status(200).json({token:token,status:true,message:'Success',data:result[0]})
        }
        else
        {
            res.status(200).json({status:false,message:'Invalid Emailid/Password.....'})
        }

     }
    
    })

});

module.exports = router;
