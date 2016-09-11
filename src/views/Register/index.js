import React, { Component } from 'react';
import { Link } from 'react-router';
import { createForm } from 'rc-form';
import _ from 'lodash';
import { Icon, List, InputItem, Button, Toast, WingBlank, Picker } from 'antd-mobile';
import './_register';
import url from '../../utils/url';
import request from 'superagent-bluebird-promise';

const carLength = [
  { label: '11米', value: 8 },
  { label: '13米', value: 2 },
  { label: '15米', value: 9 },
  { label: '17.5米', value: 3 },
  { label: '22米', value: 10 },
  { label: '4.2米', value: 4 },
  { label: '5.2米', value: 5 },
  { label: '6.8米', value: 6 },
  { label: '7.6米', value: 7 },
  { label: '9.6米', value: 1 },
  { label: '其他', value: 0 },
];

const carType = [
  { label: '低栏车', value: 10, children: carLength },
  { label: '其他', value: 0, children: carLength },
  { label: '冷藏车', value: 8, children: carLength },
  { label: '半箱式', value: 6, children: carLength },
  { label: '平板车', value: 1, children: carLength },
  { label: '特型车', value: 9, children: carLength },
  { label: '箱式车', value: 7, children: carLength },
  { label: '高栏车(无要求)', value: 11, children: carLength },
  { label: '高栏车(立柱可拆)', value: 13, children: carLength },
  { label: '高栏车(高栏/立柱可拆)', value: 14, children: carLength },
  { label: '高栏车(高栏可拆)', value: 12, children: carLength },
];
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: carType,
      verifyButtonState: false,
      countDown: 60,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendVerify = _.throttle(this.sendVerify.bind(this), 60000);
  }

  handleSubmit() {
    const carProp = this.props.form.getFieldProps('car').value;
    console.log(carProp);
    const data = {
      data: {
        mobile: this.props.form.getFieldProps('username').value,
        verify: this.props.form.getFieldProps('verify').value,
        carLength: carProp[0],
        carType: carProp[1],
        type: 'DRIVER_REGISTER',
        openId: '固定值',
      },
      service: 'SERVICE_REGISTER',
      uuid: '',
      timestamp: '',
      signatures: '',
    };
    console.log('values', data);
    request.post(url.webapp)
    .withCredentials()
    .send(data)
    .then((res) => {
      if (res.sucess) {
        sessionStorage.setItem('uuid', res.data);
        Toast.success(res.msg);
      } else {
        Toast.fail(res.msg);
      }
    });
  }

  sendVerify() {
    this.setState({ verifyButtonState: true, countDown: 60 });
    const text = setInterval(() => this.setState({ countDown: this.state.countDown - 1 }), 1000);
    setTimeout(() => {
      this.setState({ verifyButtonState: false, countDown: 60 });
      clearInterval(text);
    }, 60000);
    const data = {
      data: {
        mobile: this.props.form.getFieldProps('username').value,
        type: 'DRIVER_REGISTER',
      },
      service: 'SERVICE_IDENTIFY_CODE',
      uuid: '',
      timestamp: '',
      signatures: '',
    };
    console.log('values', data);
    request.post(url.login)
    .withCredentials()
    .send(data)
    .then((res) => {
      if (res.sucess) {
        Toast.success(res.msg);
      } else {
        Toast.fail(res.msg);
      }
    });
  }
  render() {
    const { verifyButtonState, countDown } = this.state;
    const { getFieldProps } = this.props.form;
    const verifyText = verifyButtonState ? `倒计时${countDown}` : '获取验证码';
    return (
      <div className="login">
        <div className="login-bg">
          <h3 className="logo">货管家</h3>
            <div className="login-menu">
              <Link to="register" activeClassName="active">注册</Link>
              <Link to="login" activeClassName="active">登录</Link>
            </div>
        </div>
        <div className="login-body">
          <List>
            <List.Body>
              <InputItem
                {...getFieldProps('username')}
                className="form-mobile"
                placeholder="请输入手机号"
                labelNumber={2}
                type="number"
                clear
                maxLength={11}
              >
                <Icon type="mobile"/>
              </InputItem>
              <InputItem
                {...getFieldProps('verify')}
                className="form-verify"
                placeholder="请输入验证码"
                type="number"
                maxLength={6}
                labelNumber={2}
                extra = {<Button
                  className="verify"
                  size="small"
                  inline
                  disabled={verifyButtonState}
                  onClick={this.sendVerify}
                  >{verifyText}</Button>}
                clear
              >
                <Icon type="link"/>
              </InputItem>
              <Picker
                {...getFieldProps('car')}
                className="reg-picker"
                labelNumber={2}
                cols={2}
                extra="请选择车长车型"
                data={this.state.data}
                >
                <List.Item>
                  <Icon type="setting"/>
                </List.Item>
              </Picker>
              <WingBlank>
                <Button
                  className="login-submit"
                  type="warning"
                  onClick={this.handleSubmit}>
                  确定
                </Button>
              </WingBlank>
            </List.Body>
          </List>
        </div>
      </div>
    );
  }
}

const _Login = createForm()(Login);
export default _Login;
