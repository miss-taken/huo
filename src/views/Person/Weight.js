import React, { Component } from 'react';
import { InputItem, Toast, WingBlank, Button, Picker } from 'antd-mobile';
import { createForm } from 'rc-form';
import url from '../../utils/url';
import { handleRes } from '../../utils/web';
import request from 'superagent-bluebird-promise';
import params from '../../utils/params';

class Weight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: params.carAxis,
    };
    console.log(this.state.data);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const { weight, cubic } = this.props.driverInfo;
    const { getFieldProps } = this.props.form;
    return (
      <div className="page">
        <Picker
          {...getFieldProps('carAxis')}
          className="reg-picker"
          labelNumber={1}
          cols={1}
          extra="请选择车轴数量"
          data={this.state.data}
        />
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
    location.href = '/#/person';
    const uuid = localStorage.getItem('uuid');
    const weight = this.props.form.getFieldProps('weight').value;
    const cubic = this.props.form.getFieldProps('cubic').value;

    if (weight === undefined) {
      Toast.fail('请填写吨位');
      return;
    }
    if (cubic === undefined) {
      Toast.fail('请填写吨位');
      return;
    }
    if (uuid === undefined) {
      return;
    }
    const data = {
      data: {
        cubic: cubic.toString(),
        weight: weight.toString(),
        type: 'DRIVER_CAR_WEIGHT',
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
        const driverInfo = JSON.parse(localStorage.getItem('driverInfo'));
        driverInfo.weight = weight.toString();
        driverInfo.cubic = cubic.toString();
        localStorage.setItem('driverInfo', JSON.stringify(driverInfo));
        this.context.router.push('/person');
      } else {
        Toast.fail(resultData.msg);
      }
    });
  }
}

Weight.contextTypes = {
  router: React.PropTypes.object,
};

const _Weight = createForm()(Weight);
export default _Weight;
