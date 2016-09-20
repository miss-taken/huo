import React, { Component } from 'react';
import { WingBlank, Toast, Button, Picker, List } from 'antd-mobile';
import { createForm } from 'rc-form';
import url from '../../utils/url';
import params from '../../utils/params';
import request from 'superagent-bluebird-promise';

const _carType = params.carType;
const _carLength = params.carLength;

class CarInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: _carType,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const { carLeng, carType } = this.props.driverInfo;
    const carInfo = [carType, carLeng];
    const { getFieldProps } = this.props.form;
    return (
      <div className="page edit-info">
        <List>
          <Picker
            {...getFieldProps('car', {
              initialValue: carInfo,
            })}
            className="info-picker"
            labelNumber={2}
            cols={2}
            extra="请选择车长车型"
            data={this.state.data}
            >
            <List.Item>
            </List.Item>
          </Picker>
        </List>

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

  handleSubmit() {
    const uuid = sessionStorage.getItem('uuid');
    const car = this.props.form.getFieldProps('car').value;
    let cType = car[0];
    const cLength = car[1];
    const isOther = cType === 100;

    if (car === undefined || car.length === 0) {
      Toast.fail('请选择车长车型');
      return;
    }
    if (uuid === undefined) {
      Toast.fail('请登陆');
      return;
    }

    if (cType === 100) {
      cType = 0;
    }

    const data = {
      data: {
        carType: `${cType}`,
        carLength: `${cLength}`,
        type: 'DRIVER_CAR',
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
      const resultData = JSON.parse(res.text);
      if (resultData.success) {
        const driverInfo = JSON.parse(sessionStorage.getItem('driverInfo'));
        driverInfo.carLeng = cLength;
        driverInfo.carLengthStr = _carLength.find(c => c.value === cLength).label;
        driverInfo.carType = isOther ? 100 : cType;
        driverInfo.carTypeStr = _carType.find(c => c.value === (isOther ? 100 : cType)).label;
        sessionStorage.setItem('driverInfo', JSON.stringify(driverInfo));
        Toast.success(resultData.msg);
        this.context.router.push('/person');
      } else {
        Toast.fail(resultData.msg);
      }
    });
  }
}

CarInfo.contextTypes = {
  router: React.PropTypes.object,
};


const _CarInfo = createForm()(CarInfo);
export default _CarInfo;
