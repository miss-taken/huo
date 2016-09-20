import React, { Component } from 'react';
import { WingBlank, Toast, Button, Picker, List } from 'antd-mobile';
import { createForm } from 'rc-form';
import url from '../../utils/url';
import request from 'superagent-bluebird-promise';

const carLength = [
  { label: '11米', value: 8 },
  { label: '13米', value: 2 },
  { label: '15米', value: 9 },
  { label: '17.5米', value: 3 },
  { label: '22米', value: 10 },
  { label: '4.2米', value: 4 },
  { label: '5.2米', value: 5 },
  { label: '6.8米', value: 6 },
  { label: '7.6米', value: 7 },
  { label: '9.6米', value: 1 },
  { label: '其他', value: 0 },
];

const carType = [
  { label: '低栏车', value: 10, children: carLength },
  { label: '其他', value: 0, children: carLength },
  { label: '冷藏车', value: 8, children: carLength },
  { label: '半箱式', value: 6, children: carLength },
  { label: '平板车', value: 1, children: carLength },
  { label: '特型车', value: 9, children: carLength },
  { label: '箱式车', value: 7, children: carLength },
  { label: '高栏车(无要求)', value: 11, children: carLength },
  { label: '高栏车(立柱可拆)', value: 13, children: carLength },
  { label: '高栏车(高栏/立柱可拆)', value: 14, children: carLength },
  { label: '高栏车(高栏可拆)', value: 12, children: carLength },
];

class CarInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: carType,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="page edit-info">
        <List>
          <Picker
            {...getFieldProps('car')}
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
    location.href = '/#/person';
    const uuid = sessionStorage.getItem('uuid');
    const car = this.props.form.getFieldProps('car').value;
    if (car === undefined) {
      Toast.fail('请选择车长车型');
      return;
    }
    if (uuid === undefined) {
      Toast.fail('请登陆');
      return;
    }
    const data = {
      data: {
        carType: car[1],
        carLength: car[0],
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
        const driverInfo = sessionStorage.getItem('driverInfo');
        driverInfo.carLength = car[0];
        driverInfo.carType = car[1];
        Toast.success(resultData.msg);
        console.log(this.context);
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
