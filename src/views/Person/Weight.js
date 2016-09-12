import React, { Component } from 'react';
import { InputItem, Toast, WingBlank, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import url from '../../utils/url';
import request from 'superagent-bluebird-promise';

class Weight extends Component {
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <InputItem
          {...getFieldProps('weight', {
            initialValue: '',
          })}
          clear
          placeholder="请输入吨位"
        />
        <InputItem
          {...getFieldProps('cubic', {
            initialValue: '',
          })}
          clear
          placeholder="请输入方量"
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

 // 修改吨位放量
  handleSubmit() {
    const uuid = sessionStorage.getItem('uuid');
    const weight = this.props.form.getFieldProps('weight').value;
    const cubic = this.props.form.getFieldProps('cubic').value;

    if (weight === undefined) {
      Toast.fail('请填写吨位');
      return;
    }
    if (cubic === undefined) {
      Toast.fail('请填写吨位');
      return;
    }
    if (uuid === undefined) {
      Toast.fail('请登陆');
      return;
    }
    const data = {
      data: {
        cubic: cubic.toString(),
        weight: weight.toString(),
        type: 'DRIVER_CAR_WEIGHT',
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
      if (res.success) {
        // to-do 更新个人中心吨位放量
        Toast.success(res.msg);
      } else {
        Toast.fail(res.msg);
      }
    });
  }
}
const _Weight = createForm()(Weight);
export default _Weight;
