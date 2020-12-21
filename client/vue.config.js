module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "KemGIK File";
                return args;
            })
    },
    devServer:{
        proxy:"http://localhost:81"
    },
    css:{
        loaderOptions:{
            scss:{
                prependData:`
                    @import "./src/assets/scss/main.scss";
                `
            }
        }
    }
}