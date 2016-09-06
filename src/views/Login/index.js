import React, { Component } from 'react';
import { Link } from 'react-router';
import { createForm } from 'rc-form';
import { Icon, List, InputItem, Button, Toast, WingBlank } from 'antd-mobile';
import './_login';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { form } = this.props;
    const { username = '', password = '' } = form.getFieldsValue();
    Toast.success(`成功提交账号信息, ${username} ${password}`);
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
                {...getFieldProps('password')}
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
