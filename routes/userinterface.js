var express = require('express');
var router = express.Router();
const pool = require('./pool');

router.get('/display_all_category',function(req, res ,next) {
    console.log(req.body)
    pool.query('select * from category ',function(error,result){
   if(error)
   {   
     console.log(error)
      return res.status(500).json({Data:[]})
   }
   else{
  
      return  res.status(200).json({data:result})
   }
  
    })
  });

  router.post('/display_all_subcategory',function(req,res,next) {
    console.log(req.body)
    pool.query('select * from subcategory where categoryid=?',[req.body.categoryid],function(error,result){
   if(error)
   {   
     console.log(error)
      return res.status(500).json({Data:[]})
   }
   else{
    return  res.status(200).json({data:result})  
   }
  
    })
  });

  router.get('/display_all_banner',function(req, res ,next){
          console.log(req.body) 
  pool.query('select * from banners',function(error,result){
   if(error)
   {   
     console.log(error)
      return res.status(500).json({Data:[]})
   }
   else{
  console.log(result)
      return  res.status(200).json({data:result[0]})
   }
  
    })
  });

  router.post('/display_product_salestatus',function(req,res,next){
    console.log(req.body)
     
    pool.query("select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as subcategoryname from products P where P.salestatus=?",[req.body.salestatus],function(error,result){
  
      if(error)
       { console.log(error)
         return res.status(500).json({Data:[]})
          
       }
       else{
         return res.status(200).json({data:result})
       }
    })
  })
  
  router.post('/display_subcategory_banner',function(req, res ,next) {
    console.log(req.body)
    pool.query('select * from subcategory where bannerpriority=? ',[req.body.bannerpriority],function(error,result){
   if(error)
   {   
     console.log(error)
      return res.status(500).json({Data:[]})
   }
   else{
  
      return  res.status(200).json({data:result})
   }
  
    })
  });
  router.post('/fetch_product_by_subcategory',function(req,res,next){
    console.log(req.body)
     
    pool.query("select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as subcategoryname  from products P where P.subcategoryid=?",[req.body.subcategoryid],function(error,result){
  
      if(error)
       { console.log(error)
         return res.status(500).json({Data:[]})
          
       }
       else{
         return res.status(200).json({data:result})
       }
    })
  })

  router.post("/getcolors_bysize_byproductid", function (req, res) {
    console.log("Body:", req.body);
    pool.query(
      " select * from color where productid=?",
      [req.body.productid],
      function (error, result) {
        if (error) {
          res.status(500).json({ error: error });
        } else {
          console.log(result);
          res.status(200).json({ data: result });
        }
      }
    );
  });
  router.post("/getcolor_by_size", function (req, res) {
    console.log("Body:", req.body);
    pool.query(
      " select * from color where sizeid=?",
      [req.body.size],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({ error: error });
        } else {
          
          res.status(200).json({ data: result });
        }
      }
    );
  });
module.exports = router;
