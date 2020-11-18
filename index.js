const express = require('express')
const app = express()
const path = require('path')



app.use(express.static(path.join(__dirname,'uploads')))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/auth',require('./api/auth_routes'))

app.use('/api/orders',require('./api/orders_routes'))
app.use('/api/users',require('./api/users_routes'))
app.use('/api/files',require('./api/files_routes'))
app.use('/api/guides',require('./api/guides_routes'))
app.use('/api/messages',require('./api/messages_routes'))

app.use('/api/settings',require('./api/settings_routes'))


let PORT = 3344



if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'client/dist')))
    app.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname,'client','dist','index.html'))
    })

    PORT = 81
}



try{
    app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)})
} catch(e){
    console.log(e)
}