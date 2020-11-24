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
        proxy:"http://localhost:3344"
    },
    css:{
        loaderOptions:{
            scss:{
                prependData:`
                    @import "./src/smart-grid.scss";
                `
            }
        }
    }
}