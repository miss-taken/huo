import React from 'react';
import { Modal, Button, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';

class Offer extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    const { onClose } = this.props;
    onClose();
  }
  render() {
    const { visible } = this.props;
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
          <div className="text">货物数量: 28吨,<span className="divider"></span>  110立方</div>
          <div className="text">货物报价: 393.0/吨 <span className="divider"></span>整车11000元</div>
          <div className="offer">
              <div className="form-item first">
                <InputItem
                  {...getFieldProps('xxx', {
                    initialValue: '',
                  })}
                  type="number"
                  extra="吨"
                  >装载数量</InputItem>
              </div>
              <div className="form-item price-wrapper">
                <InputItem
                  {...getFieldProps('price', {
                    initialValue: '',
                  })}
                  type="number"
                  extra="元/吨"
                  className="price1"
                  >我的报价</InputItem>
                <InputItem
                  {...getFieldProps('price2', {
                    initialValue: '',
                  })}
                  type="number"
                  extra="元"
                  className="price2"
                  ></InputItem>
              </div>
            </div>
            <Button inline className="cancel-btn" onClick={this.handleClose}>取消</Button>
            <Button inline className="confirm-btn">确定</Button>
        </div>
      </Modal>
    );
  }
}
const _Offer = createForm()(Offer);
export default _Offer;
