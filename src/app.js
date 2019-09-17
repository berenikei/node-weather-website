const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)
console.log(path.join(__dirname, '../public'))


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const viewPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name:'Berenike'
    })
})

//app.com
//app.com/help
//app.com/about

// app.get('', (req, res) => {
//     res.send('Hello express!')
// })

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        name: 'Berenikei'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        help_message: 'Node.js',
        title: 'Help',
        name: 'Berenikei'
    }) 
})

// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
         return res.send({
            errorMsg: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            errorMsg: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMsg: 'Help article not found',
        title: 'Error',
        name: 'Berenikei'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMsg: 'Page not found',
        title: 'Error',
        name: 'Berenikei'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})