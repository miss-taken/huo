import React, { Component } from 'react';
import { List, InputItem, Toast, WingBlank, Button, Picker } from 'antd-mobile';
import { createForm } from 'rc-form';
import { postRequest } from '../../utils/web';
import params from '../../utils/params';

class Weight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: params.carAxis,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.httpRequest = postRequest.bind(this);
  }

  render() {
    const { weight, cubic, carAxis } = this.props.driverInfo;
    const { getFieldProps } = this.props.form;
    return (
      <div className="page">
        <Picker
          {...getFieldProps('carAxis',{
            initialValue:carAxis
          })}
          className="reg-picker"
          labelNumber={1}
          cols={1}
          extra="请选择车轴数量"
          data={this.state.data}
        >
          <List.Item>
          </List.Item>
        </Picker>
        <InputItem
          {...getFieldProps('weight', {
            initialValue: weight,
          })}
          clear
          placeholder="请输入吨位"
          className="weight-input"
          type="number"
          />
        <InputItem
          {...getFieldProps('cubic', {
            initialValue: cubic,
          })}
          clear
          placeholder="请输入方量"
          className="weight-input"
          type="number"
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

 // 修改吨位放量
  handleSubmit() {
    const uuid = localStorage.getItem('uuid');
    const { form } = this.props;

    form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }

      if (values.weight === undefined) {
        Toast.fail('请填写吨位');
        return;
      }
      if (values.cubic === undefined) {
        Toast.fail('请填写吨位');
        return;
      }
      if (uuid === undefined) {
        return;
      }
      const data = {
          cubic: values.cubic.toString(),
          weight: values.weight.toString(),
          type: 'DRIVER_CAR_WEIGHT',
      };
      const service = 'SERVICE_DRIVER';
      this.httpRequest(data,service,(returnData)=>{
        const driverInfo = JSON.parse(localStorage.getItem('driverInfo'));
        driverInfo.weight = weight.toString();
        driverInfo.cubic = cubic.toString();
        localStorage.setItem('driverInfo', JSON.stringify(driverInfo));
        this.context.router.push('/person');
      },(returnData)=>{
          Toast.fail(returnData.msg);
      });
    });
  }
}


Weight.contextTypes = {
  router: React.PropTypes.object,
};

const _Weight = createForm()(Weight);
export default _Weight;
