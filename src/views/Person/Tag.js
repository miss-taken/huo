import React, { Component } from 'react';
import { InputItem, Tag, WingBlank, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
// import url from '../../utils/url';

class CarTag extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    location.href = '/#/person';
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="page">
        <InputItem
          {...getFieldProps('weight', {
            initialValue: '',
          })}
          clear
          // placeholder="请输入吨位方量"
        />
        <div className="tag-container">
          <Tag>车内无杂物</Tag>
          <Tag>自带工具</Tag>
          <Tag>篷布</Tag>
          <Tag>绳索</Tag>
          <Tag>枕木</Tag>
          <Tag>棉被</Tag>
          <Tag>架高杆</Tag>
        </div>
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
}
const _CarTag = createForm()(CarTag);
export default _CarTag;
