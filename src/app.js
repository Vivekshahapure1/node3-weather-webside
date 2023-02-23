const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forcast=require('./utils/forecast')
const app=express();
const pathdirectory=path.join(__dirname,'../public')
const viewPaths=path.join(__dirname,'../templates/views')
const paritalpath=path.join(__dirname,'../templates/partials')


app.set('view engine','hbs')
app.set('views', viewPaths)
hbs.registerPartials(paritalpath)
app.use(express.static(pathdirectory))

app.get('/',(req,res)=>{
    // res.send("welcome to home page")
    res.render('index',{
        title: 'Home Page',
        name: 'vivek'
    })
})
debugger
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About us',
        name: 'vivek'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error: 'Please enter the address'
        })
    }
    else{
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        //     console.log('error',error);
        //    console.log('data',data)
        if(error){
            return res.send({error})
        }
           forcast(latitude,longitude,(error,forecast)=>{
            if(error){
                res.send({error})
            }
            // console.log('data',data)
            // console.log(location)
            // console.log(data)
            res.send({
                forecastdata: forecast,
                address: req.query.address,
                location: location 
            })
        })
        })
    }
    // res.send({
    //     forecast: 'it is raining',
    //     location: 'out of the world',
    //     address: req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error: 'please provide product to be searched'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
    title: 'Errorpage',
    errorMessage: 'help article not found'
})
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        errorMessage: '404 page not found'
    })
})

app.listen(3030,()=>{
    console.log("server listening 3030 port")
})