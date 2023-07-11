const path = require('path');
const webpack = require('webpack');

module.exports = {
    name: 'gugudan-setting',
    mode: 'development', // 실서비스 : production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx'] // 밑의 엔트리 파일명의, 확장자 알아서 찾아줌
    },

    entry: {
        app: ['./client']
    }, // 입력

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 5% in KR', 'last 2 chrome versions'],
                        },
                        debug: true,
                    }
                    ],
                    '@babel/preset-react'],
                plugins: []
            }
        }]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true}),
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    }, // 출력
}