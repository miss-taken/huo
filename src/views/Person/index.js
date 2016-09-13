import React, { Component } from 'react';
import { Icon, List, Toast } from 'antd-mobile';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import Weight from './Weight';
// import Name from './Name';
// import Fu from './Fu';
// import request from 'superagent-bluebird-promise';
// import url from '../../utils/url';
import './_person';

class Person extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [
        // { url: 'https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png', id: '111' },
      ],
    };

    this.cloneChildren = this.cloneChildren.bind(this);
  }

  cloneChildren() {
    const path = this.props.location.pathname;
    if (this.props.children) {
      return React.cloneElement(this.props.children, { key: path });
    }
    return null;
  }

  render() {
    return (
      <div className="person">
        <div className="panel">
          <div className="panel-media">
            <img src="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"/>
          </div>
          <div className="panel-text">
            <h4 className="panel-text-title">
              <span>标题一</span>
              <Icon type="mobile"/>
              <span>131111111111</span>
            </h4>
            <p className="panel-text-desc">未认证</p>
            <div></div>
          </div>
        </div>
        <List>
          <List.Body>
            <Link to="/person/name">
              <List.Item
                arrow="horizontal"
                extra="林丹"
              >姓名</List.Item>
            </Link>
            <Link to="/person/car-number">
              <List.Item
                arrow="horizontal"
                extra="浙A111111"
              >车牌号</List.Item>
            </Link>
            <Link to="/person/car-info">
              <List.Item
                arrow="horizontal"
                extra="半箱式/9.6米"
              >车型车长</List.Item>
            </Link>
            <Link to="/person/car-weight">
              <List.Item
                arrow="horizontal"
                extra="2.6吨/30方"
              >方位吨量</List.Item>
            </Link>
            <Link to="/person/car-tag">
              <List.Item
              arrow="horizontal"
              extra="绳索"
              >附属物</List.Item>
            </Link>
          </List.Body>
        </List>
        <ReactCSSTransitionGroup transitionName="pageSlider"
          transitionEnterTimeout={600} transitionLeaveTimeout={600}>
          {this.cloneChildren()}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
  componentDidMount() {
    this.prepareData();
  }
  // 修改吨位放量
  prepareData() {
    const uuid = sessionStorage.getItem('uuid');
    if (uuid === undefined) {
      Toast.fail('请登陆');
      return;
    }
    const data = {
      data: {
        type: 'DRIVER_INFO',
      },
      service: 'SERVICE_DRIVER',
      uuid,
      timestamp: '',
      signatures: '',
    };
    console.log('values', data);
    // request.post(url.webapp)
    // .withCredentials()
    // .send(data)
    // .then((res) => {
    //   if (res.sucess) {
    //     Toast.success(res.msg);
    //   } else {
    //     Toast.fail(res.msg);
    //   }
    // });
  }

}

export default Person;
