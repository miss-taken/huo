import React, { Component } from 'react';
import { InputItem, WingBlank, Button } from 'antd-mobile';
import { createForm } from 'rc-form';

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
          placeholder="请输入吨位方量"
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
}
const _Weight = createForm()(Weight);
export default _Weight;
