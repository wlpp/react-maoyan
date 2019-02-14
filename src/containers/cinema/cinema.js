import React, { Component } from 'react';
import {MessageBox} from 'element-react'
class Cinema extends Component {
    componentDidMount(){
        MessageBox.msgbox( {
            type: 'warning',
            message:'页面暂无,点击返回首页'
          }).then(() => {
            this.props.history.push({pathname:'/index'})
          })
    }
  render() {
    return (
        <div ></div>
    )
    }
  }
  export default Cinema;