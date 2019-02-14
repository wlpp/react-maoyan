import React, { Component } from 'react';
import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'
import Chimee from 'chimee';
import axios from 'axios';
import moment from 'moment'
import { Message } from 'element-react';

import './trailer.css'
class Trailer extends Component {
    constructor(){
        super()
        this.state={
            commentList:[],
            videoList:[],
            num:0,
            url:'',
            title:''
        }
    }
    componentWillMount(){
        this.getCommnets()
        this.getVideos()
    }
    componentDidMount(){
      
    }
    // 获取预告片
    getVideos(){
        axios({
            url:`/Movie/Video.api?pageIndex=1&movieId=${this.props.match.params.id}`
        }).then((res) => {
            this.setState({
                videoList:res.data.videoList
            })
        }).then(() => {
            if(this.state.videoList.length!==0){
                this.setState({
                    title:this.state.videoList[0].title
                })
                const chimee = new Chimee({
                    wrapper: '.video-play',
                    src: this.state.videoList[0].hightUrl,
                    controls: true,
                    autoplay: false,
                });
            }else{
                alert('API接口数据不足请返回')
            }
        })
    }
    // 获取预告片片评论
    getCommnets(){
        axios({
        url:`/Showtime/HotMovieComments.api?pageIndex=1&movieId=${this.props.match.params.id}`
        }).then((res) => {
        this.setState({
            commentList:res.data.data.cts
        })
        })
    }
    // 点击改变视频
    videoActive(index,url,title){
        this.setState({
            num:index,
            title:title
        })
        const chimee = new Chimee({
            wrapper: '.video-play',
            src: url,
            controls: true,
            autoplay: false,
        });
    }
    init_time(time){
        let m=Math.floor(time/60%60);
        let s=Math.floor(time%60);
        if(m<10){
            m="0"+m;
        }
        if(s<10){
            s="0"+s;
        }
        time=m+":"+s;//组装当前时间
        return time
    }
    render() {
        return(
            <div className="trailer-warp">
                {/* 页面头部 */}
                <Header />
                {/* 页面内容 */}
                <div className="container">
                    <div className="video-warp">
                        <h2 className="title">{this.state.title}</h2>
                        <div className="video-box">
                            <div className="video-play"></div>
                            <div className="video-list">
                                <ul>
                                    {
                                        this.state.videoList && this.state.videoList.map((item,index) => {
                                            return(
                                                <li className="item"  key={index}  onClick={this.videoActive.bind(this,index,item.hightUrl,item.title)}>
                                                    <img src={item.image} alt="" className={this.state.num===index ? 'active':''} />
                                                    <p className="item-title">{item.title}</p>
                                                    <span className="item-time">{this.init_time(item.length)}</span>
                                                </li>
                                            )
                                        })
                                    }
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="comment-warp">
                    {
                        this.state.commentList && this.state.commentList.map((item,index) => {
                            return(
                                <div className="item" key={index} >
                                    <div className="img">
                                        <img src={item.caimg?item.caimg:require('../../assets/images/header.png')} alt=""/>
                                    </div>
                                    <div className="info">
                                        <p className="name">{item.ca}</p>
                                        <div className="data">
                                            <div className="sroce">
                                                <span className="time">{moment(new Date().getTime()-item.cd).format("YYYY-MM-DD")}</span>
                                            </div>
                                            <div className="zang">
                                            <i></i><span>{item.commentCount}</span>
                                            </div>
                                        </div>
                                        <p className="comment">{item.ce}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                {/* 页面底部 */}
                <Footer />
            </div>
        )
    }
}

export default Trailer;