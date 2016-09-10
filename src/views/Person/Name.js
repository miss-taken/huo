import React, { Component } from 'react';
import { InputItem, WingBlank, Button } from 'antd-mobile';
import { createForm } from 'rc-form';

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
}
const _Weight = createForm()(Weight);
export default _Weight;
