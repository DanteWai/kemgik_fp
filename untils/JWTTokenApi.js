const { v4: uuidv4 } = require('uuid');
const sha1 = require('sha1');
const jwt = require('jsonwebtoken')
const sk = '!C5@[H);88!+#%!hLebuJNDQ/k#p:)'

class JWTTokenApi{
    createJwt(obj){
        return jwt.sign(obj, sk)
    }
    createAT(user){
        return {
            exp: Math.floor(Date.now() / 1000) + (60 * 30),
            user
            //user:{user_id:user.user_id, fam:user.fam,name:user.name,ot:user.ot,depart:user.depart, login:user.login}
        }
    }
    createRT(){
        let token = uuidv4()
        let expires = Date.now() + (1000 * 60 * 60* 24 * 30)
        let cookieOptions = {
            httpOnly:true,
            path:'/auth/',
            expires: new Date(expires)
        }
        return {token, expires, cookieOptions}
    }

    checkAT(token){
        if(!token)  return false
        let index = token.indexOf('Bearer ')
        if(index !== 0) return false

        let input_at = token.slice(7)
        let decode_input_at = jwt.decode(input_at)
        if(!(jwt.sign(decode_input_at, sk) === input_at)) return false
        if(decode_input_at.exp < Math.floor(Date.now() / 1000)) return false

        return true
    }

    getDbRowForRT(user_id, rt, userAgent, ip){
        return {
            user_id,
            refreshToken:rt.token,
            'user-agent': userAgent,
            fingerprint: sha1(userAgent + ip),
            expiresIn: rt.expires,
            createdAt:new Date(),
            updatedAt:new Date()
        }
    }

    getJwtDate(token){
        try {
            let input_at = token.slice(7)
            let decode_input_at = jwt.decode(input_at)
            if(jwt.sign(decode_input_at, sk) === input_at) {
                return decode_input_at
            } else{
                return false
            }
        } catch (e) { return false}
    }
}

module.exports = new JWTTokenApi()