import React, { Component } from 'react';
import { Icon, List, Toast } from 'antd-mobile';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Weight from './Weight';
import Name from './Name';
import Fu from './Fu';
import request from 'superagent-bluebird-promise';
import url from '../../utils/url';
import './_person';

class Person extends Component {

  getInitialState(){
    return {
      driverInfo:null,
    }
  }

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
    
    const carDesc = this.state.driverInfo.carTypeStr+'/'+this.state.driverInfo.carLengthStr;
    const weightDesc = this.state.driverInfo.weight+'吨/'+this.state.driverInfo.cubic+'方';
    return (
      <div className="person">
        <div className="panel">
          <div className="panel-media">
            <img src="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"/>
          </div>
          <div className="panel-text">
            <h4 className="panel-text-title">
              <span>{this.state.driverInfo.name}</span>
              <Icon type="mobile"/>
              <span>{this.state.driverInfo.mobile}</span>
            </h4>
            <p className="panel-text-desc">{this.state.driverInfo.driverStatusStr}</p>
            <div></div>
          </div>
        </div>
        <List>
          <List.Body>
            <List.Item
              arrow="horizontal"
              extra={this.state.driverInfo.name}
            >姓名</List.Item>
            <ImagePicker
              onChange={this.imageChange}
              files={this.state.files}
            />
            <List.Item
              arrow="horizontal"
              extra={this.state.driverInfo.carNum}
            >车牌号</List.Item>
            <List.Item
              arrow="horizontal"
              extra= {carDesc}
            >车型车长</List.Item>
            <List.Item
              arrow="horizontal"
              extra={weightDesc}
            >方位吨量</List.Item>
            <List.Item
            arrow="horizontal"
            extra={this.state.driverInfo.carTools}
            >附属物</List.Item>
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
  // 获取司机信息
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
    request.post(url.webapp)
    .withCredentials()
    .send(data)
    .then((res) => {
      const resultData = JSON.parse(res.text);
      if (resultData.success) {
        Toast.success(resultData.msg);
      } else {
        Toast.fail(resultData.msg);
      }
    });

 const xxx = {
        "carLengthStr": "测试内容d73h",
        "carNum": "测试内容21jk",
        "carTools": "测试内容c3v6",
        "carTypeStr": "测试内容8si9",
        "certifyStatus": 52117,
        "certifyStatusStr": "测试内容wycn",
        "cubic": 58304,
        "driverStatusStr": "测试内容riqr",
        "imageName": "测试内容3x13",
        "luckyBean": 70437,
        "mobile": "测试内容9t48",
        "name": "测试内容2j9j",
        "weight": 42212
    };
    this.setState({
      driverInfo:xxx,
    });
    console.log(this.state.driverInfo);
  }
}

export default Person;
