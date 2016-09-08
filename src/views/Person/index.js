import React, { Component } from 'react';
import { Icon, List, ImagePicker } from 'antd-mobile';
import './_person';

class Person extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [
        // { url: 'https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png', id: '111' },
      ],
    };

    this.imageChange = this.imageChange.bind(this);
  }

  imageChange(files, type, index) {
    console.log('iamge', files, type, index);
    this.setState({ files });
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
            <List.Item
              arrow="horizontal"
              extra="林丹"
            >姓名</List.Item>
            <ImagePicker
              onChange={this.imageChange}
              files={this.state.files}
            />
            <List.Item
              arrow="horizontal"
              extra="浙A111111"
            >车牌号</List.Item>
            <List.Item
              arrow="horizontal"
              extra="半箱式"
            >车型</List.Item>
            <List.Item
              arrow="horizontal"
              extra="9.6米"
            >车长</List.Item>
            <List.Item
              arrow="horizontal"
              extra="2.6吨/30方"
            >附属物</List.Item>

          </List.Body>
        </List>
      </div>
    );
  }
}

export default Person;
