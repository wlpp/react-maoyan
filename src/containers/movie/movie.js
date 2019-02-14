import React, { Component } from 'react';
import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'
import {Link} from 'react-router-dom' 
import axios from 'axios';
import './movie.css'
class Movie extends Component {
  constructor(){
    super()
    this.state={
      id:0,
      num1:0,
      num2:0,
      navList:['正在热映','即将上映','经典影片'],
      tagList:["全部","爱情","喜剧","动画","剧情","恐怖","惊悚","科幻","动作","悬疑","犯罪","冒险","战争","奇幻","运动","家庭","古装","武侠","西部","历史","传记","歌舞","短片", "纪录片"],
      LocationMovies:[]
    }
  }
   componentWillMount(){
    this.getLocationMovies()
}
  getLocationMovies(){
    axios({
        url:'/Showtime/LocationMovies.api?locationId=365'
    }).then((res) => {
      res.data.ms.sort((a,b) => {
        return parseInt(b.wantedCount)-parseInt(a.wantedCount)
      })
      this.setState({
        LocationMovies:res.data.ms,
        tpmLocationMovies:res.data.ms
      })
    })
}
// 导航
navActive(index){
  this.setState({
    id:index
  })
}
// 分类
tagActive(index,title){
  this.setState({
    num1:index
  })
  let tpmArr = this.state.tpmLocationMovies.filter((item) => {
      return item.movieType.includes(title)
  })
  if(title==="全部"){
    this.setState({
      LocationMovies:this.state.tpmLocationMovies
    })
  }else{
    this.setState({
      LocationMovies:tpmArr
    })
  }
  
}
// 排序
sortActive(index){
  this.setState({
    num2:index
  })
  if(index===0){
    this.state.LocationMovies.sort((a,b) => {
      return parseInt(b.wantedCount)-parseInt(a.wantedCount)
    })
  }else if(index===1){
    this.state.LocationMovies.sort((a,b) => {
      return parseInt(b.rd)-parseInt(a.rd)
    })
  }else if(index===2){
    this.state.LocationMovies.sort((a,b) => {
      return parseInt(b.r)-parseInt(a.r)
    })
  }
  
}
  render() {
    return (
      <div className="movie-warp">
          {/* 页面头部 */}
          <Header />
          {/* 分类导航 */}
          <div className="subbox">
            <ul className="subnav">
            {
              this.state.navList.map((item,index) => {
                return(
                  <li className={this.state.id===index?"active":''} key={index}  onClick={this.navActive.bind(this,index)}>{item}</li>
                )
              })
            }
            </ul>
          </div>
          {/* 分类 */}
          <div className="tagsbox">
             <ul>
               <div className="tag-title">类型</div>
               {
                 this.state.tagList && this.state.tagList.map((item,index) => {
                 return(
                  <li key={index} className={this.state.num1===index?"fl-active":''} onClick={this.tagActive.bind(this,index,item)}>{item}</li>
                 )
                })
               }
             </ul>
          </div>
          <div className="movies-box">
            {/* 排序 */}
            <ul className="sort-box">
                <li onClick={this.sortActive.bind(this,0)} className={this.state.num2===0?"st-active":''}>按热门排序</li>
                <li onClick={this.sortActive.bind(this,1)} className={this.state.num2===1?"st-active":''}>按时间排序</li>
                <li onClick={this.sortActive.bind(this,2)} className={this.state.num2===2?"st-active":''}>按评价排序</li>
            </ul>
            <div className="content">
            {
                this.state.LocationMovies.map((item,index) => {
                    return(
                        <div className="item" key={index} >
                        <Link to={`/detail/${item.id}`}>
                            <div className="item-img">
                                <img src={item.img} alt=""/>
                                {
                                    item.isIMAX3D === true ? <span className="label"></span> : ''
                                }
                                <div className="mask"></div>
                            </div>
                        </Link>
                        <p className="name">
                                    <span >{item.t}</span>
                                
                        </p>
                        <p className="msg">
                            {
                                 <span className="score">{item.r===-1?'未知':item.r}</span>
                            }
                        </p>
                            {/* <p className="item-sorce" >{item.r}</p> */}
                        </div>
                    )
                })
            }
            </div>
          </div>
          {/* 页面底部 */}
          <Footer />
      </div>
    );
  }
}

export default Movie;
