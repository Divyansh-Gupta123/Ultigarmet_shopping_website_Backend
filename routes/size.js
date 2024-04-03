var express = require('express');
const pool = require('./pool');
var router = express.Router();

/* GET home page. */

router.post('/insertsize',function(req,res){
  console.log(req.body)
    pool.query('insert into size(categoryid,subcategoryid,size,productid) values(?,?,?,?)',[req.body.categoryid,req.body.subcategoryid,req.body.size,req.body.productid],function(error,result){

if(error)
{     console.log(error)
    res.status(500).json({status:false})
}
else
{
    res.status(200).json({status:true})
}


    })

})

router.post('/display_size_byproductid',function(req,res,next){
    pool.query('select s.*,( select c.categoryname from category c where c.categoryid=s.categoryid ) as cn , (select r.subcategoryname from subcategory r where r.subcategoryid=s.subcategoryid) as sn,(select p.productname from products p where p.productid=s.productid) as pn from size s where productid=?  ',[req.body.productid],function(error,result){
       console.log(error)
        if(error)
        {
             return res.status(500).json({Data:[]})
        }
        else
        {
          if(result.length>0)
          {  size=JSON.parse(result[0].size)
               
          return res.status(200).json({ data:size })
          }
          else
          {return res.status(200).json({ data:[] })}
          
        }
    })
})

router.post('/edit_size_data',function(req, res ,next) {
    console.log("body:",req.body)
    pool.query('update size set categoryid = ? , subcategoryid = ? , productid=?, size = ?  where sizeid = ? ',[req.body.categoryid,req.body.subcategoryid,req.body.productid,req.body.size,req.body.sizeid],function(error,result){
      if(error)
      {    
        console.log(req.body)
         return res.status(500).json({status:false})
      }
      else{
     
         return  res.status(200).json({status:true})
      }
     
    })
  });

  router.post('/display product_by subcategoryid',function(req,res,next){
    console.log(req.body)
     
    pool.query("select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid) as cn,(select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as sn from products P where subcategoryid=?",[req.body.subcategoryid],function(error,result){
  
      if(error)
       { console.log(error)
         return res.status(500).json({Data:[]})
          
       }
       else{
         return res.status(200).json({data:result})
       }
    })
  })
module.exports = router;