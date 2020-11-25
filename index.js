const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()

app.use(express.static(path.join(__dirname,'uploads')))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/auth',require('./api/auth_routes'))

const authMid = require('./middleware/auth')
const adminMid = require('./middleware/admin')

app.use('/api/orders', authMid, require('./api/orders_routes'))
app.use('/api/users',authMid, adminMid,require('./api/users_routes'))
app.use('/api/files',require('./api/files_routes')) //todo authMid или проверки в роутах
app.use('/api/guides',authMid,require('./api/guides_routes'))
app.use('/api/messages',authMid,require('./api/messages_routes'))

app.use('/api/settings',authMid, adminMid, require('./api/settings_routes'))

app.use('/uploads',require('./api/uploads_routes'))

let PORT = process.env.PORT || 80



if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'client/dist')))
    app.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname,'client','dist','index.html'))
    })
}



try{
    app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)})
} catch(e){
    console.log(e)
}