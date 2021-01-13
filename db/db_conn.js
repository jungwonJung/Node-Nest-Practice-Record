var mysql = require('mysql');  // mysql 인스턴스 가져오기
var config = require('./db_info').local; // 데이터베이스 접속정보 가져오기

module.exports = function () {
    return {
        init : function () {
            return mysql.createConnection({
                host : config.host,
                port : config.port,
                user : config.user,
                password : config.password,
                database : config.database
            })
        }
    }
};