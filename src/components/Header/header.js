import React, { Component } from 'react';
import {Link,NavLink} from 'react-router-dom' 
import './header.css'
class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            num:0,
            navList:[
                {
                    url:'/index',
                    title:'首页'
                },
                {
                    url:'/movie',
                    title:'电影'
                },
                {
                    url:'/cinema',
                    title:'影院'
                },
                {
                    url:'/ranking',
                    title:'榜单'
                },
                {
                    url:'/hot',
                    title:'热点'
                },
            ]
        }
    }
    componentDidMount(){
        console.log(sessionStorage.getItem('name'));
    }
    navActive(index){
        this.setState({
            num:index
        })
    }
    removeLogin(){
        sessionStorage.removeItem('name')
        location.reload()
    }
  render() {
    return (
      <div className="header">
        <div className="header-inner">
            {/* 页面logo */}
            <Link to='/' className="logo"></Link>
            {/* 导航栏 */}
            <ul className="nav">
            {
                this.state.navList && this.state.navList.map((item,index) => {
                    return(
                        <li key={index}>
                            <NavLink  className='nav-item' activeClassName='active' to={item.url}>{item.title}</NavLink>
                        </li>
                    )
                })
            }
            </ul>
           {/* app下载 */}
            <div className="download">
                <i className="phone"></i>
                <span>APP下载</span>
                <i className="el-icon-caret-top"></i>
                <div className="popup">
                    <div className="app-link"></div>
                    <p>扫码下载APP</p>
                    <p>选座更优惠</p>
                </div>
            </div>
            {/* 查询 */}
            <div className="search">
                <input type="text" placeholder="找影视剧、影人、影院"/>
                <i className="el-icon-search"></i>
            </div>
            {/* 用户登录 */}
            <div className="login">
                <div className="userImg"></div>
                {
                    sessionStorage.getItem('name') && sessionStorage.getItem('name')!==''&&<div className="userName">{sessionStorage.getItem('name')}<p>欢迎</p></div>
                }
                
                <i className="el-icon-caret-top"></i>
                    <div className="popup">
                    {
                        sessionStorage.getItem('name') && sessionStorage.getItem('name')!==''?<span to="/login" onClick={this.removeLogin.bind(this)}>退出</span>:<Link to="/login">登录</Link>
                    }
                     </div>
                
            </div>
        </div>
      </div>
    );
  }
}

export default Header;
