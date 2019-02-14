import React, { Component } from 'react';
import {Link} from 'react-router-dom' 
// import { Carousel } from 'element-react';
import './item-hot.css'
class Hot extends Component {
    constructor(props){
        super(props)
        this.state={}
    }
  render() {
    const  {num,LocationMovies} = this.props
    return (
        <div className="item-hot">
            <div className="title">
                <h3>正在热映(<span>{num}</span>部)</h3>
                <Link to="/movie">
                    全部<i className="el-icon-arrow-right"></i>
                </Link>
            </div>
            <div className="content">
            {
                LocationMovies.map((item,index) => {
                if(index<18){
                    return(
                        <div className="item" key={index} >
                        <Link to={`/detail/${item.id}`}>
                            <div className="item-img">
                                <img src={item.img} alt=""/>
                                {
                                    item.isIMAX3D === true ? <span className="label"></span> : ''
                                }
                                <p className="info">
                                    <span className="name">{item.t}</span>
                                {
                                        item.r ===-1 ? '' : <span className="score">{item.r}</span>
                                }
                                </p>
                                <div className="mask"></div>
                            </div>
                        </Link>
                            <Link className="item-buy" to="/cinema">购票</Link>
                        </div>
                    )
                }
                })
            }
                
                
            </div>
        </div>
    );
    }
  }
  export default Hot;