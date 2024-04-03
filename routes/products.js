const { json } = require('express');
var express = require('express');
const upload = require('./multer');
const pool = require('./pool');
var router = express.Router();

/* GET home page. */
router.post('/addrecord_data',upload.single('icon'), function(req, res, next) {
 
pool.query('insert into products (categoryid,subcategoryid,productname,price,offerprice,stock,description,rating,status,salestatus,picture) values(?,?,?,?,?,?,?,?,?,?,?)'
,[req.body.categoryid,req.body.subcategoryid,req.body.productname,req.body.price,req.body.offerprice,req.body.stock,req.body.description,req.body.rating,req.body.status,req.body.salestatus,req.file.originalname], function(error,result){
    console.log(req.body)
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
});

router.get('/display_all_products',function(req,res,next){
   
   pool.query("select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid) as cn,(select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as sn from products P",function(error,result){
     if(error)
      { console.log(error)
        return res.status(500).json({Data:[]})
         
      }
      else{
        return res.status(200).json({data:result})
      }
   })
})

router.post('/Edit_product_data',function(req,res,next){
  pool.query('update products set categoryid=?,subcategoryid=?,productname=?,price=?,offerprice=?,stock=?,description=?,rating=?,status=?,salestatus=? where productid=?'
,[req.body.categoryid,req.body.subcategoryid,req.body.productname,req.body.price,req.body.offerprice,req.body.stock,req.body.description,req.body.rating,req.body.status,req.body.salestatus,req.body.productid], function(error,result){
    console.log(req.body)
    console.log(error)
    if(error)
    {     
      console.log(error)
       return res.status(500).json({status:false})
    }
    else{
   
       return  res.status(200).json({status:true})
    }

})
});
router.post('/delete_product_data',function(req,res,next){
  pool.query('delete from products where productid=?',[req.body.productid], function(error,result){
    console.log(req.body)
    console.log(error)
    if(error)
    {     
      console.log(error)
       return res.status(500).json({status:false})
    }
    else{
   
       return  res.status(200).json({status:true})
    }

})
});

router.post('/update_picture',upload.single('picture'),function(req, res ,next) {
  console.log(req.file)
  pool.query('update products set picture=? where productid=?',[req.file.originalname,req.body.productid],function(error,result){
 if(error)
 {   
   console.log(error)
    return res.status(500).json({status:false})
 }
 else{

    return  res.status(200).json({status:true})
 }

  })
});
  

router.post('/display_subcategory_by_category',function(req,res,next){
  console.log(req.body)
   
  pool.query("select * from subcategory where categoryid=?",[req.body.categoryid],function(error,result){

    if(error)
     { console.log(error)
        res.status(500).json({Data:[]})
        
     }
     else{
      console.log('hyy',result)
        res.status(200).json({data:result})
        
     }
  })
})
router.post('/displayproduct_bysubcategoryid',function(req,res,next){
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


router.post('/add_banner_picture',upload.any(),function(req, res ,next) {
  console.log(req.files)
  var banner=[]
  req.files.map((item)=>{
     banner.push(item.filename)
  })
  pool.query('insert into banners(bannerpicture) values(?)',[JSON.stringify(banner)],function(error,result){
 if(error)
 {   
   console.log(error)
    return res.status(500).json({status:false})
 }
 else{

    return  res.status(200).json({status:true})
 }

  })
});



module.exports = router;
