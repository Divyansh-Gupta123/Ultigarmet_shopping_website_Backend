var express = require('express');
const pool = require('./pool');
var upload=require("./multer")
var router = express.Router();
 router.post('/addsubcategory',upload.single('icon'),function(req,res,next){
    
  pool.query('insert into subcategory (categoryid,subcategoryname,icon,bannerpriority) values(?,?,?,?)',[req.body.categoryid,req.body.subcategoryname,req.file.originalname,req.body.bannerpriority],function(error,result){
    console.log(req.body)
    console.log(req.file)
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

   router.get('/display_all_subcategory',function(req, res ,next) {
  
    pool.query('select s.*,(select c.categoryname from category c where c.categoryid=s.categoryid) as cn from subcategory s',function(error,result){
      console.log(error)
      if(error)
   {   
     
       res.status(500).json({Data:[]})
   }
   else{
     console.log(result)
      res.status(200).json({data:result})    
      
   }
  
    })
  });

  router.post('/edit_subcategory',function(req, res ,next) {
    console.log("body:",req.body)
    pool.query('update subcategory set  categoryid = ? , subcategoryname = ?  where subcategoryid = ? ',[req.body.categoryid,req.body.subcategoryname,req.body.subcategoryid],function(error,result){
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
  router.post('/delete_subcategory',function(req, res ,next) {
    console.log(req.body)
    pool.query('delete from subcategory where subcategoryid=? ',[req.body.subcategoryid],function(error,result){
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
    pool.query('update subcategory set icon=? where  subcategoryid=?',[req.file.originalname,req.body.subcategoryid],function(error,result){
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
  
  router.post('/display_subcategory_by_categoryid',function(req,res){

    pool.query('select * from subcategory where categoryid=?',[req.body.categoryid],function(error,result){
    
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




module.exports = router;
