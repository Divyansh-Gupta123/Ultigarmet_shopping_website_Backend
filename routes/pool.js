var mysql=require('mysql')
var pool=mysql.createPool({
host:'localhost',
port:3306,
user:'root',
password:'deepu123',
database:'the_ultimate_garments',
connectionLimit:100

})
module.exports=pool