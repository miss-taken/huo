import React, { Component } from 'react';
import { InputItem, Tag, Toast, WingBlank, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import url from '../../utils/url';
import request from 'superagent-bluebird-promise';

class Fu extends Component {
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <InputItem
          {...getFieldProps('weight', {
            initialValue: '',
          })}
          clear
          placeholder="请输入吨位方量"
        />
        <div className="tag-container">
          <Tag selected>自带工具</Tag>
          <Tag>篷布</Tag>
          <Tag>绳索</Tag>
          <Tag>枕木</Tag>
          <Tag>棉被</Tag>
          <Tag>架高杆</Tag>
        </div>
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

  // 修改车辆附属物
  handleSubmit() {
    const uuid = sessionStorage.getItem('uuid');
    const carTools = this.props.form.getFieldProps('carTools').value;

    if (uuid === undefined) {
      Toast.fail('请登陆');
      return;
    }
    if (name === undefined) {
      Toast.fail('请选择附属物');
      return;
    }

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
      if (res.success) {
        // to-do 更新个人中心司机姓名
        Toast.success(res.msg);
      } else {
        Toast.fail(res.msg);
      }
    });
  }
}

const _Fu = createForm()(Fu);
export default _Fu;
