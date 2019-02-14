import React, { Component } from 'react';
// import {Link} from 'react-router-dom' 
// import { Carousel } from 'element-react';
import './footer.css'
class Footer extends Component {
  render() {
    return (
        <div className="footer">
          <p className="friendly-links">
            商务合作邮箱：v@maoyan.com
            客服电话：10105335
            违法和不良信息举报电话：4006018900
            <br/>
            投诉举报邮箱：tousujubao@meituan.com
            舞弊线索举报邮箱：wubijubao@maoyan.com
          </p>
          <p className="friendly-links">
              友情链接 :
              <span className="color">美团网</span>
              <span className="color">美团下载</span>
              <span className="color">欢喜首映</span>
          </p>
          <p>
              ©2016
              猫眼电影 maoyan.com
              <span>京ICP证160733号</span>
              <span>京ICP备16022489号-1</span>
              <span>京公网安备 11010102003232号</span>
              <span>网络文化经营许可证</span>
              <span>电子公告服务规则</span>
          </p>
          <p>北京猫眼文化传媒有限公司</p>
      </div>
    );
    }
  }
  export default Footer;