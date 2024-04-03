var express = require('express');
const pool = require('./pool');
var router = express.Router();

/* GET home page. */
router.post('/display_size_color', function(req, res, next) {
   pool.query('select * from  size where  productid=?',[req.body.productid],function(error,result){
    if (error)
    {
        return res.status(500).json({data:['']})
    }
    else 
    {
        return res.status(200).json({data:result})
    }
   })
 
});
router.post('/add_color_data',function(req,res,next){
    console.log(req.body)
    pool.query('insert into color (categoryid,subcategoryid,productid,sizeid,colorcode) values(?,?,?,?,?)',[req.body.categoryid,req.body.subcategoryid,req.body.productid,req.body.sizeid,req.body.colorcode],function(error,result){
        console.log(error)
        if(error)
        {   
          console.log(error)
           return res.status(500).json({result:false})
        }
        else{
       
           return  res.status(200).json({result:true})
        }
       
    })
})



module.exports = router;
