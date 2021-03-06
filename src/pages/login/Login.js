import React, { Component } from 'react';
const message = require('antd/lib/message');
import axios from 'axios';

require('./login.css');
const Login = React.createClass({
    getInitialState() {
        return {
            text: '',
            password: '',
        };
    },
    login() {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let checkRemeber = document.getElementById('checkRemeber').checked;
        console.log(username, checkRemeber, password);
        //登陆请求 并保存cookie
        axios.post('/api/admin/login', { username: username, password: password })
            .then((response) => {
                const data = response.data
                if (data.code == 200) {
                    let exp = new Date();
                    exp.setTime(exp.getTime() + data.data.expires_in * 100);
                    document.cookie = 'token' + "=" + escape(data.data.token_type + data.data.access_token) + ";expires=" + exp.toGMTString();

                    this.props.history.push('/dataStatistics')
                    //如果选择记住我
                    if (checkRemeber) {
                        document.cookie = 'username' + "=" + escape(username) + ";expires=" + exp.toGMTString();
                        document.cookie = 'password' + "=" + escape(password) + ";expires=" + exp.toGMTString();
                    }
                } else {
                    message.error(data.msg);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    },
    componentDidMount() {
    },
    render() {
        return (
            <div className='lg_contain'>
                <div className='lg_title'>智能健康大数据后台系统</div>
                <div className='lg_enTitle'>Intelligent medical big data Agent Background</div>
                <div className="lg_form">
                    <div className='lg_loginTitle'>用户登录</div>
                    <div>
                        <input type="text" className='lg_input' id='username' />
                        <input type="password" className='lg_input' id='password' />
                    </div>
                    <div className='lg_remeber'>
                        <input type='checkbox' id='checkRemeber' /> <span className='lg_remeberPsd'>记住密码</span>
                    </div>
                    <div className='lg_loginBtn' onClick={() => this.login()}>
                        登录
                    </div>
                </div>
                <div className='lg_footer'>
                    广东阅云科技有限公司
                    ICP备案  沪B2-20100138-1
                </div>
            </div>
        )
    }
})
module.exports = Login;
