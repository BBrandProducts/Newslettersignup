const express=require("express")
const app=express();
const ejs=require("ejs")
const https=require("https")
const bodyParser=require("body-parser")
const request=require("request")
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
  res.sendFile(__dirname + "/signup.html")
})
app.post("/",function(request,res) {

  const firstName=request.body.fName;
  const lastName =request.body.lName;
  const email=request.body.eM;
  const data={
     members:[
       {
         email_address:email,
         status:"subscribed",
         merge_fields:{
           FNAME:firstName,
           LNAME:lastName,
         }}]}
   const jsondata=JSON.stringify(data);
const url="https://us21.api.mailchimp.com/3.0/lists/cbe86f37b2";
const option={
method: "POST",
auth:"Bilal:376a0316c978fe90aee9718f972e08d5-us21"
}

var request=https.request(url,option,function(response){
  if (response.statusCode===200) {

    res.sendFile(__dirname +"/success.html")
  }else{
      res.sendFile(__dirname + "/failure.html")
  }
response.on("data",function(data){

console.log(JSON.parse(data));
})

})
request.write(jsondata);
request.end();

});



app.post("/failure",function(req,res){
res.redirect("/")

})

app.listen(process.env.PORT || 3500, function(){
  console.log("Server is running port 3500");
});

// api key
// 376a0316c978fe90aee9718f972e08d5-us21
// list id and audience id
// cbe86f37b2
