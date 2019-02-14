import React, { Component } from 'react';
import {Link,Route} from 'react-router-dom' 
import {Message} from 'element-react'
import axios from 'axios';
import './reg.css'

class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            hasBorder:false,
            hasInfo:false,
            number:'',
            name:'',
            pwd1:'',
            pwd2:''

        }
    }
    isSubmit(){
        let number = this.refs.number.value
        let name = this.refs.name.value
        let pwd1 = this.refs.pwd1.value
        let pwd2 = this.refs.pwd2.value
        let reg1 = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/ 
        let reg2 = /[\u4e00-\u9fa5]{1,4}/gm 
        let reg3 = /^[a-z0-9]{6,}$/i
        if(number===''){
            Message('手机号不能为空');
            return
        }else if(!reg1.test(number)){
            Message('请输入正确手机号');
            return
        }else if(name===''){
            Message('昵称不能为空');
            return
        }else if(!reg2.test(name)){
            Message('中文昵称字数不能大于四');
            return
        }else if(pwd1===''){
            Message('密码不能为空')
            return
        }else if(!reg3.test(pwd1)){
            Message('请输入6位以上英文数字')
            return
        }else if(pwd2===''){
            Message('确认密码不能为空')
            return
        }else if(pwd1!==pwd2){
            Message('两次密码不一致')
            return
        }else{
            axios({
                url:`https://www.apiopen.top/createUser?key=00d91e8e0cca2b76f515926a36db68f5&phone=${number}&passwd=${pwd1}&name=${name}`
            }).then((res) => {
                if(res.data.code===200){
                    Message('注册成功')
                    setTimeout(() => {
                        this.props.history.push({pathname:'/login'})
                    }, 1000);
                }else{
                    Message(res.data.msg)
                }
            })
        }
    }
    render(){
        return(
            <div className="reg-warp">
                <div className="reg-header">
                    <div className="reg-logo"></div>
                </div>
                <div className="reg-content">
                    <div className="login-Img"></div>
                    <div className="reg-form">
                        <p>账号注册</p>
                        <div className="input-box">
                            <span className="txt" >手机号</span>
                            <input type="text" ref='number' maxLength='11'  />
                        </div>
                        <div className="input-box">
                            <span className="txt">昵称</span>
                            <input type="text" ref='name' />
                        </div>
                        <div className="input-box">
                            <span className="txt">密码</span>
                            <input type="password" ref='pwd1' />
                        </div>
                        <div className="input-box">
                            <span className="txt">确认密码</span>
                            <input type="password" ref='pwd2' />
                        </div>
                        <div className="btn-reg" onClick={this.isSubmit.bind(this)} >同意以下协议并注册</div>
                        <p className="reg-text"><Link to="/">《美团网用户协议》</Link></p>
                    </div>
                </div>
            </div>
        )
    }
} 

export default Login;