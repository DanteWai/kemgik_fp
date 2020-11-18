const {Router} = require('express')
const router = Router()
const UserModel = require('../models/User_model')
const SessionModel = require('../models/Session_model')
const cookieParser = require('cookie-parser')
const axios = require('axios')
const JWTTokenApi = require('../untils/JWTTokenApi')


router.get('/check', cookieParser(), async (req ,res) => {
    if(JWTTokenApi.checkAT(req.get('Authorization')) && req.cookies.refreshToken)
        return res.status(200).json({res:true})
    else
        return res.status(401).json({error:'Авторизация не удалась'})
})

router.get('/refresh', cookieParser(), async (req ,res) => {
    try {

        let at = JWTTokenApi.getJwtDate(req.get('Authorization'))
        let rt = req.cookies.refreshToken

        if(at && rt){
            let user_id = at.user.id
            let session = await SessionModel.find(user_id, rt)
            let expire = +session.expiresIn

            if((expire > Date.now()) ?? (req.get('user-agent') === session['user-agent'])){
                let newUserData = await UserModel.findByID(user_id)
                let newAT = JWTTokenApi.createAT(newUserData)
                let newRT = JWTTokenApi.createRT()
                let inDB = JWTTokenApi.getDbRowForRT(user_id, newRT, req.get('user-agent'), req.ip)

                await SessionModel.update(inDB,user_id,rt)
                res.cookie('refreshToken', newRT.token,newRT.cookieOptions)
                return res.json({res:true, at:JWTTokenApi.createJwt(newAT), rt: newRT.token})

            } else {
                await SessionModel.deleteByIdAndToken(user_id, rt)
                res.clearCookie('refreshToken',{path:'/auth/'})
                return res.status(200).json({res:false})
            }
        }
    } catch (e) {
        return res.status(500).json({res:e.message})
    }

})

router.post('/login', cookieParser(), async (req, res) => {

    try {
        if(req.cookies.refreshToken) await SessionModel.deleteByToken(req.cookies.refreshToken)

        let {login, password} = req.body
        let {data} = await axios.post('http://localhost/auth/out_login',{login,password})


        if(data.answer){
            let user = data.answer
            let fp_user = await UserModel.findByAuthID(user.AuthID)

            if(user.disabled === 1){
                return res.status(403).json({error:'Пользователь заблокирован'})
            }


            if(!fp_user){
                fp_user = await UserModel.add({AuthID:user.AuthID, role:'user', sso_data:user})
            } else {
                fp_user.sso_data = user
                fp_user = await UserModel.update(fp_user)
            }

            fp_user = fp_user[0]
            delete fp_user.sso_data.AuthID

            let at = JWTTokenApi.createAT(fp_user)
            let rt = JWTTokenApi.createRT()
            let inDB = JWTTokenApi.getDbRowForRT(fp_user.id, rt, req.get('user-agent'), req.ip)

            await SessionModel.checkForLogin(fp_user.id)

            await SessionModel.add(inDB)
            res.cookie('refreshToken', rt.token,rt.cookieOptions)
            return res.json({at:JWTTokenApi.createJwt(at), rt: rt.token})
        } else{
            return res.status(403).json({error:'Неверный логин или пароль'})
        }

    } catch (e) {
        return res.status(500).json({error:'Авторизация не удалась ' + e.message})
    }
})

router.get('/logout', cookieParser(), async (req ,res) => {
    try {
        let at = JWTTokenApi.getJwtDate(req.get('Authorization'))
        let rt = req.cookies.refreshToken

        if(at && rt) await SessionModel.deleteByIdAndToken(at.user.id, rt)
        else if(at) await SessionModel.deleteByUserID(at.user.id)
        else if(rt)  await SessionModel.deleteByToken(rt)


        res.clearCookie('refreshToken',{path:'/auth/'})
        return res.status(200).json({res:true})
    } catch (e){
        return res.status(500).json({error:'Операция не удалась', res:false})
    }
})

module.exports = router


