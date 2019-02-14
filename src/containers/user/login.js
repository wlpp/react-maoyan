import React, { Component } from 'react';
import {Link} from 'react-router-dom' 
import './login.css'
import {Message} from 'element-react'
import axios from 'axios';
class Login extends Component {
goLogin(){
    let number = this.refs.number.value
    let password = this.refs.password.value
    if(number===''){
        Message('手机号不能为空')
    }else if(password===''){
        Message('密码不能为空')
    }else{
        axios({
            url:`https://www.apiopen.top/login?key=00d91e8e0cca2b76f515926a36db68f5&phone=${number}&passwd=${password}`
        }).then((res) => {
            if(res.data.code===200){
                // sessionStorage.removeItem('name')
                Message('登录成功')
                setTimeout(() => {
                    this.props.history.push({pathname:'/index'})
                    sessionStorage.setItem('name',res.data.data.name)
                }, 1000);
            }else{
                Message(res.data.msg)
            }
        })
    }
}
    render(){
        return(
            <div className="login-warp">
                <div className="login-header">
                    <div className="login-logo"></div>
                </div>
                <div className="login-content">
                    <div className="login-Img"></div>
                    <div className="login-form">
                        <p>账号登录</p>
                        <input type="text" placeholder="请输入手机号" ref='number' maxLength='11'/>
                        <input type="password" placeholder="请输入密码" ref='password'/>
                        <div className="btn-login" onClick={this.goLogin.bind(this)}>登录</div>
                        <p className="reg-text">还没有账号? <Link to="/reg">免费注册</Link></p>
                    </div>
                </div>
            </div>
        )
    }
} 

export default Login;