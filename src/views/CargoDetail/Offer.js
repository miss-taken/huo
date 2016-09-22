import React from 'react';
import { Modal, Button, InputItem, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import request from 'superagent-bluebird-promise';
import url from '../../utils/url';

class Offer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleOffer = this.handleOffer.bind(this);
    this.handleTypeToggle = this.handleTypeToggle.bind(this);
  }

  handleTypeToggle() {
    const { unitType } = this.state;
    this.setState({ unitType: (unitType === 1 ? 2 : 1) });
  }

  handleClose() {
    const { onClose } = this.props;
    onClose();
  }

  handleOffer() {
    const { unitType } = this.state;
    const { cargoInfo, form } = this.props;
    const values = form.getFieldsValue();

    const data = {
      data: {
        cargoId: cargoInfo.id,
        quantity: values.quantity,
        unitPrice: values.unitPrice,
        unitType,
        type: 'CARGO_APPLY',
      },
      service: 'SERVICE_CARGO',
      uuid: '',
      timestamp: '',
      signatures: '',
    };

    request.post(url.webapp)
    .withCredentials()
    .send(data)
    .then((res) => {
      const resultData = JSON.parse(res.text);
      if (resultData.success) {
        Toast.success(resultData.msg);
        // const { unitType } = ;
        // this.setState({
          // cargoInfo: resultData.result,
          // projectInfo: resultData.result.projectInfo,
          // unitType,
        // });
      } else {
        Toast.fail(resultData.msg);
      }
    });
  }

  render() {
    const { unitType } = this.state;
    const unitTypeStr = unitType === 1 ? '吨' : '方';
    const { visible, cargoInfo } = this.props;
    const { getFieldProps } = this.props.form;
    return (
      <Modal
        visible={visible}
        className="cargo-offer-modal"
        style={{
          width: 'auto',
          height: 'auto',
        }}
        >
        <div className="cargo-offer">
          <div className="text">
            货物数量: {cargoInfo.weight}吨,<span className="divider"></span> {cargoInfo.cubic}立方
          </div>
          <div className="text">
            货主报价: {cargoInfo.unitPrice}元/{cargoInfo.unitType === 1 ? '吨' : '方'}
            <span className="divider"></span>整车{cargoInfo.totalPrice}元
          </div>
          <div className="offer">
              <div className="form-item first">
                <InputItem
                  {...getFieldProps('quantity', {
                    initialValue: '',
                  })}
                  type="number"
                  extra={unitTypeStr}
                  >装载数量</InputItem>
                <span className="unit-toggle" onClick={this.handleTypeToggle}></span>
              </div>
              <div className="form-item price-wrapper">
                <InputItem
                  {...getFieldProps('unitPrice', {
                    initialValue: '',
                  })}
                  type="number"
                  extra={`元/${unitTypeStr}`}
                  className="price1"
                  >我的报价</InputItem>
                <InputItem
                  {...getFieldProps('totalPrice', {
                    initialValue: '',
                  })}
                  type="number"
                  extra="元"
                  className="price2"
                  ></InputItem>
              </div>
            </div>
            <Button inline className="cancel-btn" onClick={this.handleClose}>取消</Button>
            <Button inline className="confirm-btn" onClick={this.handleOffer}>确定</Button>
        </div>
      </Modal>
    );
  }
}
const _Offer = createForm()(Offer);
export default _Offer;
