const express = require('express');
const hbs=require('hbs');
const fs=require('fs');
var app =express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err)
    {
      console.log('Unable to append server.lg')
    }
  });
  next();
});

app.use(express.static(__dirname+'/public'));
// app.use((req,r es,next)=>{
// res.render('maintenance.hbs')
// });


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
app.get('/',(req,res)=>{
  //res.send('<h1>Hello Express :)</h1>');
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage:'hello world'
  });
});
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page'

  });
});

app.get('/bad',(req,res)=>{
  //res.send('<h1>Hello Express :)</h1>');
  res.send({
    status: 'Bad Request'
  });
});

app.listen(3000);
console.log('Server up on port 3000');
