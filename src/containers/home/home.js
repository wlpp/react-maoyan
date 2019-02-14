import React, { Component } from 'react';
import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'
import Banner from '../../components/Banner/banner'
import Hot from '../../components/Index-item/item-hot/item-hot'
import Show from '../../components/Index-item/item-show/item-show'
import axios from 'axios';
import './home.css'
class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      LocationMovies:[],
      MovieComingNew:[]
    }
  }
  componentWillMount(){
    this.getLocationMovies()
    this.getMovieComingNew()
    // name={this.props.location.query.name}
    // console.log(this.props.history);
}
// 获取热门上映
getLocationMovies(){
    axios({
        url:'/Showtime/LocationMovies.api?locationId=365'
    }).then((res) => {
      this.setState({
        LocationMovies:res.data.ms
      })
    })
}
// 获取即将上映
getMovieComingNew(){
  axios({
      url:'/Movie/MovieComingNew.api?locationId=365'
  }).then((res) => {
    this.setState({
      MovieComingNew:res.data.moviecomings
    })
  })
}
  render() {
    return (
      <div className="home-warp">
      {/* 页面头部 */}
      <Header  />
      {/* 轮播图 */}
      <Banner />
      {/* 页面内容 */}
      <div className="container">
          {/* 正在热播 */}
          <Hot LocationMovies={this.state.LocationMovies} num={this.state.LocationMovies.length} />
          {/* 即将上映 */}
          <Show showList={this.state.MovieComingNew} num={this.state.MovieComingNew.length} />
      </div>
      {/* 页面底部 */}
      <Footer />
      </div>
    );
  }
}

export default Home;
