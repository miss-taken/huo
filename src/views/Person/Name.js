import React, { Component } from 'react';
import { InputItem, WingBlank, Toast, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import request from 'superagent-bluebird-promise';
import url from '../../utils/url';

class Weight extends Component {
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <InputItem
          {...getFieldProps('name', {
            initialValue: '林丹',
          })}
          clear
          placeholder="请输入姓名"
        />
        <WingBlank>
          <Button
            className="login-submit"
            type="warning"
            onClick={this.handleSubmit}>
            确定
          </Button>
        </WingBlank>
      </div>
    );
  }

  handleSubmit() {
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
    request.post(url.login)
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
const _Weight = createForm()(Weight);
export default _Weight;
