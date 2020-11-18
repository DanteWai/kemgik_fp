module.exports = {
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