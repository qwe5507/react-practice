const path = require('path');

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development', // 실서비스 : production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx'] // 밑의 엔트리 파일명의, 확장자 알아서 찾아줌
    },

    entry: {
        // client.jsx안에 WordRelay.jsx를 불러오기때문에 안적어줘도 된다.
        app: ['./client']
    }, // 입력

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties']
            }
        }]
    },

    output: {
        path: path.join(__dirname, 'dist'), // 현재폴더경로/dist
        filename: 'app.js'
    }, // 출력
}