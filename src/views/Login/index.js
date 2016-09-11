import React, { Component } from 'react';
import { Link } from 'react-router';
import { createForm } from 'rc-form';
import { Icon, List, InputItem, Toast, Button, WingBlank } from 'antd-mobile';
import request from 'superagent-bluebird-promise';
import url from '../../utils/url';
import './_login';


class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }


 // 登陆请求
  handleSubmit() {
    const { form } = this.props;
    form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('values', values);
      console.log('username', form.getFieldProps('username'));
      values.openId = '12345';
      const data = {
        data: values,
        service: 'SERVICE_LOGIN',
        uuid: '',
        timestamp: '',
        signatures: '',
      };
      request.post(url.login)
      .withCredentials()
      .send(data)
      .then((res) => {
        if (res.sucess) {
          sessionStorage.setItem('uuid', res.result);
          Toast.success(res.msg);
        } else {
          Toast.fail(res.msg);
        }
      });
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
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
                {...getFieldProps('username', {
                  initialValue: '',
                  rules: [
                    { required: true, message: '该项为必填项' },
                  ],
                })}
                className="form-mobile"
                placeholder="请输入手机号"
                labelNumber={2}
                type="phone"
                clear
              >
                <Icon type="mobile"/>
              </InputItem>
              <InputItem
                {...getFieldProps('password', {
                  initialValue: '',
                  rules: [
                    { required: true, message: '该项为必填项' },
                  ],
                })}
                className="form-password"
                placeholder="请输入密码"
                type="password"
                labelNumber={2}
                clear
              >
                <Icon type="lock"/>
              </InputItem>
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
