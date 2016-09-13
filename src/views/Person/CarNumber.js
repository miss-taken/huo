import React, { Component } from 'react';
import { InputItem, WingBlank, Toast, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import url from '../../utils/url';
import request from 'superagent-bluebird-promise';

class CarNumber extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="page edit-number">
        <InputItem
          {...getFieldProps('name', {
            initialValue: '浙A111111',
          })}
          clear
          placeholder="请输入车牌号"
          className="number-input"
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
    const name = this.props.form.getFieldProps('name').value;
    if (name === undefined) {
      Toast.fail('请填写姓名');
      return;
    }
    if (uuid === undefined) {
      Toast.fail('请登陆');
      return;
    }
    const data = {
      data: {
        name,
        type: 'DRIVER_NAME',
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
      if (res.sucess) {
        // to-do 更新个人中心司机姓名
        Toast.success(res.msg);
      } else {
        Toast.fail(res.msg);
      }
    });
  }
}
const _CarNumber = createForm()(CarNumber);
export default _CarNumber;
