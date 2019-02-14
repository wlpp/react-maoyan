import React, { Component } from 'react';
import {Link} from 'react-router-dom' 
// import { Carousel } from 'element-react';
import './item-show.css'
class Show extends Component {
    constructor(props){
        super(props)
        this.state={}
    }
  render() {
      const {num,showList} =this.props
    return (
        <div className="item-show">
            <div className="title">
                <h3>即将上映(<span>{num}</span>部)</h3>
                <Link to="/movie">
                    全部<i className="el-icon-arrow-right"></i>
                </Link>
            </div>
            <div className="content">
            {
                showList.map((item,index) => {
                    if(index<18){
                        return(
                            <div className="item" key={index}>
                                <Link to={`/detail/${item.id}`} className="item-img">
                                    <img src={item.image} alt=""/>
                                    {/* <span className="label"></span> */}
                                    <p className="info">
                                        <span className="name">{item.title}</span>
                                    </p>
                                    <div className="mask"></div>
                                </Link>
                                <div className="item-buy">
                                    <Link className="notice" to={`/trailer/${item.id}`}>预告片</Link>
                                    <Link to="/cinema">预 售</Link>
                                </div>
                                <p className="mesage">{item.releaseDate}</p>
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
  export default Show;