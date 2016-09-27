import React, { Component } from 'react';
import { Link } from 'react-router';
import { createForm } from 'rc-form';
import { Icon, List, InputItem, Toast, Button, WingBlank } from 'antd-mobile';
import request from 'superagent-bluebird-promise';
import { postRequest } from '../../utils/web';
import './_login';


class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.httpRequest = postRequest.bind(this);
  }

 // 登陆请求
  handleSubmit() {
    const { form } = this.props;    
    const re = new RegExp('[&,?]code=([^//&]*)', 'i');
    const weChatCode = re.exec(location.href)[1];
    
    form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      const data = {
          mobile: values.username,
          passWord: values.password,
          weChatCode,
        };
      const serviceName = 'SERVICE_LOGIN';
      this.httpRequest(data,serviceName,(returnData)=>{
          localStorage.setItem('uuid', returnData.result.uuid);
          this.context.router.push('/person');
      },(returnData)=>{
          Toast.fail(returnData.msg);
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
                type="number"
                maxLength={11}
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

Login.contextTypes = {
  router: React.PropTypes.object,
};

const _Login = createForm()(Login);
export default _Login;
