const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname,'../public'))
const app = express()

//This is for express to look for static file
const publicDirectoryPath = path.join(__dirname,'../public')

//Handle bars views directory
const viewPath = path.join(__dirname,'../templates/views')

const partialsPath = path.join(__dirname,'../templates/partials')
//Define the template engine
app.set('view engine','hbs')

//set the HBS file path
app.set('views',viewPath)

hbs.registerPartials(partialsPath)

//static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather Application',
        name : 'Advait Nair'
    })
})

app.get('/help',(req,res)=>{
   res.render('help',{
       message:'Help Message',
       title : 'Weather Application',
       name : 'Santhosh Kumar Nair'
   })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About Us',
        name : 'Santhosh Kumar Nair'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error : 'address must be provided'
        })
    }

    geocode(req.query.address,(error,{lat,long,place}={})=>{
        if(error){
            return res.send({
                error
            })
        }
    
        forecast(lat, long, (error, {description}) => {
    
            if(error){
                return res.send({
                    error
                })
            }
            
            return res.send({
                place,
                forecase:description
            })
    
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error : 'serach parameter is missing'
        })
    }
    
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errormessage : 'Help article Not Found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errormessage : 'Page Not Found'
    })
})
app.listen(3000,()=>{
    console.log('Server is up on 3000')
})

