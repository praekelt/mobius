import Reqwest from 'reqwest';

module.exports = {
    login: function(username, pass, callback) {
        if (localStorage.token) {
            if (callback) callback(true)
            return
        }
        this.getToken(username, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token;
                if (callback) callback(true)
            } else {
                if (callback) callback(false)
            }
        })
    },

    logout: function() {
        delete localStorage.token
    },

    loggedIn: function() {
        return !!localStorage.token
    },

    getToken: function(username, password, callback) {
        Reqwest({
            url: '/api-auth/',
            type: 'json',
            method: 'post',
            data: {
                username,
                password
            },
            success: function(res){
                callback({
                    authenticated: true,
                    token: res.token
                })
            }
        })
    },
}/**
 * Created by peter on 2016/09/07.
 */
