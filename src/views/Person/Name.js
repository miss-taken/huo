import React, { Component } from 'react';
import { InputItem, WingBlank, Toast, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import url from '../../utils/url';
import { handleRes } from '../../utils/web';
import request from 'superagent-bluebird-promise';

class Name extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const { name } = this.props.driverInfo;
    const { getFieldProps } = this.props.form;
    return (
      <div className="page edit-name">
        <InputItem
          {...getFieldProps('name', {
            initialValue: name,
          })}
          clear
          placeholder="请输入姓名"
          className="name-input"
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
    request.post(url.webapp)
    .withCredentials()
    .send(data)
    .then((res) => {
      const resultData = handleRes(res);
      if (resultData.success) {
        const driverInfo = JSON.parse(sessionStorage.getItem('driverInfo'));
        driverInfo.name = name;
        sessionStorage.setItem('driverInfo', JSON.stringify(driverInfo));
        Toast.success(resultData.msg);
        this.context.router.push('/person');
      } else {
        Toast.fail(resultData.msg);
        this.context.router.push('/person');
      }
    });
  }
}

Name.contextTypes = {
  router: React.PropTypes.object,
};

const _Name = createForm()(Name);
export default _Name;
