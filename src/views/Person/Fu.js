import React, { Component } from 'react';
import { InputItem, Tag, WingBlank, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
// import url from '../../utils/url';

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
}
const _Fu = createForm()(Fu);
export default _Fu;
