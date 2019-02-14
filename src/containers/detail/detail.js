import React, { Component } from 'react';
import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'
import {Link} from 'react-router-dom' 
import {Message} from 'element-react'

import './detail.css'
import { Rate } from 'element-react';
import axios from 'axios';
import moment from 'moment'
class Detail extends Component {
  constructor(props){
    super(props)
    this.state={
      num:0,
      detailList:[],
      release:{},
      director:{},
      actor:[],
      imageAll:[],
      firstImage:'',
      commentList:[],
      directorList:[],
      actorList:[],
      writerList:[],
    }
  }
  componentWillMount(){
    this.getDetail()
    this.getImageAll()
    this.getCommnets()
    this.getActhors()
  }
  // 点击切换
  setActive(index){
    this.setState({
      num:index
    })
  }
  // 判断是否登录
  goLogin(){
    if(!sessionStorage.getItem('name')){
      Message('登录后才能操作')
      !sessionStorage.getItem('name') && this.props.history.push({pathname:'/login'})
    }
  }
  // 获取影片详情
  getDetail(){
    axios({
      url:`/movie/detail.api?locationId=365&movieId=${this.props.match.params.id}`
    }).then((res) => {
      this.setState({
        detailList:res.data,
        release:res.data.release,
        director:res.data.director,
        actor:res.data.actorList,
      })
    })
  }
  // 获取剧照
  getImageAll(){
    axios({
      url:`/Movie/ImageAll.api?movieId=${this.props.match.params.id}`
    }).then((res) => {
      this.setState({
        imageAll:res.data.images,
        firstImage:res.data.images[0]
      })
    })
  }
  // 获取影片评论
  getCommnets(){
    axios({
      url:`/Movie/HotLongComments.api?pageIndex=1&movieId=${this.props.match.params.id}`
    }).then((res) => {
      this.setState({
        commentList:res.data.comments
      })
    })
  }
  // 获取演职员表
  getActhors(){
    axios({
      url:`/Movie/MovieCreditsWithTypes.api?movieId=${this.props.match.params.id}`
    }).then((res) => {
      if(res.data.types.length!==0){
        this.setState({
          directorList:res.data.types[0].persons,
          actorList:res.data.types[1].persons,
        })
      }
    })
  }
  render() {
    return (
      <div className="detail-warp">
          {/* 页面头部 */}
          <Header />
          {/* 页面内容 */}
          <div className="container">
          {/* 影片介绍 */}
            <div className="banner">
                  <div className="warper">
                      <div className="img">
                        <img src={this.state.detailList.image?this.state.detailList.image:require('../../assets/images/kong.png')} alt=""/>
                      </div>
                      {/* 内容 */}
                      <div className="con">
                        <h3 className="c_name">{this.state.detailList.titleCn}</h3>
                        <p className="e_name">{this.state.detailList.titleEn}</p>
                        <p className="type">{this.state.detailList.type}</p>
                        <p className="time">中国大陆 / {this.state.detailList.runTime}</p>
                        <p className="date">{this.state.release.date} {this.state.release.location}上映</p>
                        <Rate  max={10}  onChange={this.goLogin.bind(this)} />
                        <div className="btn-buy" onClick={this.goLogin.bind(this)}>特惠购票</div>
                      </div>
                      {/* 评分 */}
                      <div className="data">
                        <span className="sorce">用户评分:</span>
                        <p>{this.state.detailList.rating!=='-1.0'?this.state.detailList.rating:'未知'}</p>
                        <span className="sorce">累计票房</span>
                        <p>6.91<span>亿</span></p>
                      </div>
                  </div>
              </div>
            </div>
          {/* 影片详情 */}
            <div className="main">
              <ul className="tab">
                  <li className={this.state.num===0 ? 'active':''} onClick={this.setActive.bind(this,0)}>介绍</li>
                  <li className={this.state.num===1 ? 'active':''} onClick={this.setActive.bind(this,1)}>演职人员</li>
                  <li className={this.state.num===2 ? 'active':''} onClick={this.setActive.bind(this,2)}>图集</li>
              </ul>
              <div className="tab-content">
                {/* 介绍 */}
                <div  className={this.state.num===0 ? 'tab-des tab-show' : ' tab-none'}>
                    <h3 className="title">剧情简介</h3>
                    <div className="con-base con">
                        <p>{this.state.detailList.content}</p>
                    </div>
                    <h3 className="title">演职人员
                    <span className="more">全部<i className="el-icon-arrow-right"></i></span>
                    </h3>
                    <div className="con-people con">
                      <div className="celebrity-group">
                        <div className="celebrity-type">导演</div>
                        <ul className="celebrity-list">
                        <li className="celebrity-item">
                          <div className="img">
                              <img src={this.state.director.directorImg} alt=""/>
                          </div>
                          <p className="name">{this.state.director.directorName}</p>
                          </li>
                        </ul>
                      </div>
                      <div className="celebrity-group">
                        <div className="celebrity-type">演员</div>
                        <ul className="celebrity-list">
                        {
                          this.state.actor.map((item,index) => {
                            return(
                              <li className="celebrity-item" key={index}>
                                <div className="img">
                                    <img src={item.actorImg} alt=""/>
                                </div>
                                <p className="name">{item.actor?item.actor:'未知'}</p>
                                <p className="s_name">饰：{item.roleName}</p>
                              </li>
                            )
                          })
                        }
                        </ul>
                      </div>
                    </div>
                    <h3 className="title">图集
                    <span className="more">全部<i className="el-icon-arrow-right"></i></span>
                    </h3>
                    <div className="con-img con">
                        <div className="bigImg">
                          <img src={this.state.firstImage.image?this.state.firstImage.image:''} alt=""/>
                          <Link to={`/trailer/${this.props.match.params.id}`} className="icon-play"></Link>
                        </div>
                        <ul className="smallImg">
                        {
                          this.state.imageAll.map((item,index) => {
                            if(index>70&&index<83){
                              return(
                                <li key={index}>
                                  <img src={item.image} alt=""/>
                                </li>
                                )
                            }
                           
                          })
                        }
                        </ul>
                    </div>
                    <h3 className="title">热门评论
                    <span className="btn-write" onClick={this.goLogin.bind(this)}>写评论</span>
                    </h3>
                    <div className="con-comment con">
                    {
                      this.state.commentList && this.state.commentList.map((item,index) => {
                        return(
                          <div className="item" key={index}>
                            <div className="img">
                                <img src={item.headurl?item.headurl:require('../../assets/images/header.png')} alt=""/>
                            </div>
                            <div className="info">
                                <p className="name">{item.nickname}</p>
                                <div className="data">
                                <div className="sroce">
                                    <Rate disabled={true} value={item.rating} max={10} />
                                    <span className="time">{moment(new Date().getTime()-item.modifyTime).format("MM-DD")}</span>
                                </div>
                                <div className="zang" onClick={this.goLogin.bind(this)}>
                                  <i></i><span>{item.commentCount}</span>
                                </div>
                                </div>
                                <p className="comment">{item.content}</p>
                            </div>
                          </div>
                        )
                        
                      })
                    }
                    </div>
                  </div>
                {/* 演职人员 */}
                <div className={this.state.num===1 ? 'tab-people tab-show' : 'tab-none'}>
                    <div className="celebrity-group">
                      <div className="celebrity-type"><span>导演</span>( {this.state.directorList.length} )</div>
                        <div className="celebrity-list">
                        {
                          this.state.directorList && this.state.directorList.map((item,index) => {
                            return(
                              <div className="item" key={index}>
                              <div className="img">
                                    <img src={item.image} alt=""/>
                                </div>
                                <p className="name">{item.name}</p>
                                {/* <p className="s_name">饰：马先勇</p> */}
                              </div>
                            )
                          })
                        }
                        </div>
                    </div>
                    <div className="celebrity-group">
                      <div className="celebrity-type"><span>演员</span>( {this.state.actorList.length} )</div>
                        <div className="celebrity-list">
                        {
                          this.state.actorList && this.state.actorList.map((item,index) => {
                            return(
                              <div className="item" key={index}>
                              <div className="img">
                                    <img src={item.image} alt=""/>
                                </div>
                                <p className="name">{item.name?item.name:'未知'}</p>
                                <p className="s_name">饰：{ item.personateCn?item.personateCn:'未知'}</p>
                              </div>
                            )
                          })
                        }
                        </div>
                    </div>
                    <div className="celebrity-group">
                      <div className="celebrity-type"><span>编剧</span>( {this.state.writerList.length} )</div>
                        <div className="celebrity-list">
                        {
                          this.state.writerList && this.state.writerList.map((item,index) => {
                            return(
                              <div className="item" key={index}>
                              <div className="img">
                                    <img src={item.image} alt=""/>
                                </div>
                                <p className="name">{item.name?item.name:'未知'}</p>
                              </div>
                            )
                          })
                        }
                        </div>
                    </div>
                </div>
                {/* 图集 */}
                <div className={this.state.num===2 ? 'tab-image tab-show' : 'tab-none'}>
                    <div className="content">
                    {
                      this.state.imageAll && this.state.imageAll.map((item,index) => {
                        if(index>20){
                          return(
                            <img src={item.image} alt="" key={index}/>
                          )
                        }
                      })
                    }
                    </div>
                </div>
              </div>
            </div>
          {/* 页面底部 */}
          <Footer />
       </div>
    );
  }
}

export default Detail;
