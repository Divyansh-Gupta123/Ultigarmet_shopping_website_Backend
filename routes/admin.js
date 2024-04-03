const e = require('express');
var express = require('express');
const pool = require('./pool');
var router = express.Router();

/* GET home page. */
router.post('/check_admin_login', function(req, res, next) {
    console.log("Body:",req.body)
  
    pool.query('select * from  administrator where emailid=? and password=?',[req.body.emailid,req.body.password],function(error,result){
        if(error)
        {   console.log (error)
            return res.status(500).json({result:false})
        }
        else
        {
            if(result.length==1)
            {
            return res.status(200).json({result:true,data:result[0]})
            }
            else{
                return res.status(200).json({result:false})
            }
        }
    })
});

module.exports = router;
