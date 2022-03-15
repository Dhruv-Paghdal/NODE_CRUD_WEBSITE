const express = require('express');
const hbs = require('express-handlebars');
const Handlebars = require('handlebars');
const bodyParser=require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const route  = require('./server/routes/router');
const connection = require('./server/database/database');
const app = express();
const PORT = 4500;

connection;

app.set('view engine','hbs');
app.use(express.static(path.join(__dirname,'/public')));

app.engine('hbs',hbs.engine({
    extname: 'hbs',
    layoutsDir : path.join(__dirname , 'views/layouts')
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

app.use("/",route);

Handlebars.registerHelper('eq', function( a, b ){
    var next =  arguments[arguments.length-1];
	return (a === b) ? next.fn(this) : next.inverse(this);
});

app.listen(process.env.PORT || 3000,()=>{
    console.log(`Express Server Running on http://localhost:${process.env.PORT}`);
})
