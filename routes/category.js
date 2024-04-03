var express = require('express');
const pool = require('./pool');
var router = express.Router();
var upload=require("./multer")

/* GET home page. */
router.post('/addcategory',upload.single('icon'),function(req, res ,next) {
  console.log(req.body)
  pool.query('insert into category(categoryname,icon) values(?,?)',[req.body.categoryname,req.file.originalname],function(error,result){
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
router.post('/edit_category_data',function(req, res ,next) {
  console.log(req.body)
  pool.query('update category set categoryname=? where categoryid=? ',[req.body.categoryname,req.body.categoryid],function(error,result){
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
router.post('/delete_category_data',function(req, res ,next) {
  console.log(req.body)
  pool.query('delete from category where categoryid=? ',[req.body.categoryid],function(error,result){
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
router.post('/update_icon',upload.single('icon'),function(req, res ,next) {
  console.log(req.file)
  pool.query('update category set icon=? where categoryid=?',[req.file.originalname,req.body.categoryid],function(error,result){
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