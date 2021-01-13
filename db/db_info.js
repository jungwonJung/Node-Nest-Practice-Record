module.exports = (function () {  // 모듈로 사용할수 있도록 만들어준다
    return {
        local: {   // 해당변수 안에 배열로 접속정보를 저장한다
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: '99189176',
            database: 'nodejs-quest'
        },
        real: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        },
        staging: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        },
        dev: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        }
    }
})();
