module.exports.keys = {
    jwt:'!C5@[H);88!+#%!hLebuJNDQ/k#p:)',
}

module.exports.mail = {
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "aa502", // generated ethereal user
        pass: "ccyqbxtldflclnqz" // generated ethereal password
    }
}

module.exports.db = {
    host: '127.0.0.1',
    port: 5432,
    database: 'kemgik_fp',
    user: 'postgres',
    password: 'pepsicola',
    charset: 'utf8',
}