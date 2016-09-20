import React, { Component } from 'react';
import { Tag, Toast, WingBlank, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import url from '../../utils/url';
import { handleRes } from '../../utils/web';
import request from 'superagent-bluebird-promise';

const initTags = [
  { name: '车内无杂物' },
  { name: '自带工具' },
  { name: '篷布' },
  { name: '绳索' },
  { name: '枕木' },
  { name: '棉被' },
  { name: '架高杆' },
];

class CarTag extends Component {
  constructor(props) {
    super(props);

    const { carTools } = this.props.driverInfo;
    let tags;
    if (carTools) {
      tags = carTools.split(';');
      tags = initTags.map(tag => {
        if (tags.includes(tag.name)) {
          tag.selected = true;
        }
        return tag;
      });
    }
    this.state = {
      tags: tags || initTags,
    };
    this.handleSelectTag = this.handleSelectTag.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelectTag(_tag) {
    console.log('tag click');
    const { tags } = this.state;
    tags.find(tag => tag.name === _tag.name).selected = !_tag.selected;
    console.log('tags', tags);
    this.setState({ tags });
  }

  componentWillReceiveProps(nextProps) {
    const { carTools } = nextProps.driverInfo;
    let tags;
    if (carTools) {
      tags = carTools.split(',');
      tags = initTags.map(tag => {
        if (tags.includes(tag.name)) {
          tag.selected = true;
        }
        return tag;
      });
    }
    this.setState({ tags });
  }

  render() {
    const { tags } = this.state;
    return (
      <div className="page">
        <div className="tag-container">
          {tags.filter(tag => tag.selected).map((tag, index) =>
            <Tag className="selected" disabled key={index} selected>{tag.name}</Tag>)}
        </div>
        <div className="tag-container">
          {tags.map((tag, index) => <Tag
            key={index}
            selected={tag.selected}
            onChange={this.handleSelectTag.bind(this, tag)}>{tag.name}</Tag>)}
        </div>
        <WingBlank>
          <Button
            className="submit-btn"
            type="warning"
            onClick={this.handleSubmit}>
            确定
          </Button>
        </WingBlank>
      </div>
    );
  }

  // 修改车辆附属物
  handleSubmit() {
    const uuid = sessionStorage.getItem('uuid');
    const { tags } = this.state;
    const carTools = tags
    .filter(tag => tag.selected)
    .map(tag => tag.name).join(';') || '';

    if (uuid === undefined) {
      Toast.fail('请登陆');
      return;
    }
    if (carTools === undefined) {
      Toast.fail('请选择附属物');
      return;
    }

    console.log(carTools);
    const data = {
      data: {
        carTools,
        type: 'DRIVER_CAR_TOOLS',
      },
      service: 'SERVICE_DRIVER',
      uuid,
      timestamp: '',
      signatures: '',
    };
    request.post(url.webapp)
    .withCredentials()
    .send(data)
    .then((res) => {
      const _res = handleRes(res);
      if (_res.success) {
        location.href = '/#/person';
        Toast.success(_res.msg);
        const driverInfo = JSON.parse(sessionStorage.getItem('driverInfo'));
        driverInfo.carTools = carTools;
        sessionStorage.setItem('driverInfo', JSON.stringify(driverInfo));
        this.context.router.push('/person');
      } else {
        Toast.fail(_res.msg);
        this.context.router.push('/person');
      }
    });
  }
}

CarTag.contextTypes = {
  router: React.PropTypes.object,
};

const _CarTag = createForm()(CarTag);
export default _CarTag;
