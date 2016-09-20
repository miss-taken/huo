import React, { Component } from 'react';
import { InputItem, WingBlank, Toast, Button, Popup, Flex } from 'antd-mobile';
import { createForm } from 'rc-form';
import url from '../../utils/url';
import { handleRes } from '../../utils/web';
import request from 'superagent-bluebird-promise';

class CarNumber extends Component {
  constructor(props) {
    super(props);
    const { carNum } = this.props.driverInfo;
    this.state = {
      tag: carNum ? carNum.slice(0, 1) : '',
      tags: [
        { name: '京' },
        { name: '津' },
        { name: '浙' },
        { name: '川' },
        { name: 'x' },
        { name: 'a' },
        { name: 'b' },
        { name: 'd' },
        { name: 'e' },
        { name: 'r' },
        { name: 'p' },
        { name: 'o' },
        { name: 'i' },
        { name: 'u' },
        { name: 'y' },
        { name: 'h' },
        { name: 'j' },
        { name: 'k' },
        { name: 'l' },
        { name: ';' },
      ],
    };
    this.showTags = this.showTags.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSelectTag = this.handleSelectTag.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleToggle(selectTag, index) {
    if (selectTag.active) return null;
    const { tags } = this.state;
    const _tags = tags.map(tag => {
      tag.active = null;
      return tag;
    })
    .map(tag => {
      if (tag.name === selectTag.name) {
        tag.active = 'active';
      }
      return tag;
    });
    const $buttons = document.querySelectorAll('.flex-button-container button');
    $buttons.forEach((button) => {
      button.classList.remove('active');
    });
    $buttons[index].classList.add('active');
    this.setState({ tags: _tags });
    return null;
  }

  handleSelectTag() {
    const { tags } = this.state;
    const _tag = tags.find((tag) => tag.active);
    this.setState({ tag: _tag.name });
    Popup.hide();
  }

  showTags() {
    const { tags } = this.state;
    Popup.show(
      <div className="edit-tag">
        <Flex wrap="wrap" className="flex-button-container">
          {tags.map((tag, index) => <Button
            className={tag.active || ''}
            onClick={this.handleToggle.bind(this, tag, index)} key={index}>{tag.name}
          </Button>)}
        </Flex>
        <Button
          className="select-tag"
          onClick={this.handleSelectTag}>完成</Button>
      </div>
    , { animationType: 'slide-up' });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ tag: nextProps.driverInfo.carNum.slice(0, 1) });
  }

  render() {
    const { tag } = this.state;
    const { carNum } = this.props.driverInfo;
    const initCarNum = carNum ? carNum.slice(1) : '';
    const { getFieldProps } = this.props.form;
    return (
      <div className="page edit-number">
        <div className="car-number-tag-wrapper">
            <div className="car-number-tag" onClick={this.showTags}>
              {tag}<span className="caret"></span>
            </div>
        </div>
        <InputItem
          {...getFieldProps('carNum', {
            initialValue: initCarNum,
          })}
          clear
          placeholder="请输入车牌号"
          className="number-input"
          maxLength={6}
        />
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

  handleSubmit() {
    location.href = '/#/person';
    const uuid = sessionStorage.getItem('uuid');
    const carNum = this.props.form.getFieldProps('carNum').value;
    const { tag } = this.state;
    const _carNum = `${tag}${carNum}`;
    if (_carNum === undefined) {
      Toast.fail('请填写车牌号');
      return;
    }
    if (uuid === undefined) {
      Toast.fail('请登陆');
      return;
    }
    const data = {
      data: {
        carNum: _carNum,
        type: '	DRIVER_CAR_NUM',
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
        const driverInfo = sessionStorage.getItem('driverInfo');
        driverInfo.carNum = _carNum;
        Toast.success(_res.msg);
        this.context.router.push('/person');
      } else {
        Toast.fail(_res.msg);
      }
    });
  }
}
const _CarNumber = createForm()(CarNumber);
export default _CarNumber;
