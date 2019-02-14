import React, { Component } from 'react';
import {Link} from 'react-router-dom' 
import { Carousel } from 'element-react';
import './banner.css'
class Banner extends Component {
  render() {
    return (
        <div className="medium">
        {/* eslint-disable-next-line */}
        <Carousel interval="5000" arrow="always" height="440px" arrow="hover">
                <Carousel.Item>
                    <Link to="/"><img src={require('../../assets/images/img1.jpg')} alt=""/></Link>
                </Carousel.Item>
                <Carousel.Item>
                    <Link to="/"><img src={require('../../assets/images/img2.jpg')} alt=""/></Link>
                </Carousel.Item>
                <Carousel.Item>
                    <Link to="/"><img src={require('../../assets/images/img3.jpg')} alt=""/></Link>
                </Carousel.Item>
                <Carousel.Item>
                    <Link to="/"><img src={require('../../assets/images/img4.jpg')} alt=""/></Link>
                </Carousel.Item>
                <Carousel.Item>
                    <Link to="/"><img src={require('../../assets/images/img5.jpg')} alt=""/></Link>
                </Carousel.Item>
        </Carousel>
      </div>
    );
    }
  }
  export default Banner;