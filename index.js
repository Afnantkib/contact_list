const express = require("express");
const path = require('path');
const port = 8000;
// require mongoose
const db=require('./config/mongoose');
const Contact=require('./models/contact');
//to fire up xepress or get all the functionalities of express
const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
var contactList = [
    {
        name: "Arpan",
        phone: "8825001619",
    }, { name: "Stark", phone: "123456789" }, { name: "Ahsan", phone: "123764828" }
];

app.get('/', function (req, res) {
    Contact.find({},function(err,contacts){
        if(err){
            console.log("error ",err);
            return;
        }
        return res.render('home', {
            title: "Contacts list",
            contacts_list: contacts
        });
    })
   
})
app.get('/delete-contact',function(req,res){
    let id=req.query.id;
Contact.findByIdAndDelete(id,function(err){
if(err){
    console.log("error in deleting ");
    return;
}
})


    return res.redirect("back");
})
app.get('/practise', function (req, res) {
    return res.render('practise', {
        title: "yes this is practise title"
    });
})
app.post('/create-contact', function (req, res) {
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log("ERROR ",err);
            return;
        }
       
    return res.redirect('back');
    });
   
})

app.listen(port, function (err) {
    if (err) {
        console.log("Error ", err);
    }


    console.log("My express server is runing on port ", port);


})


