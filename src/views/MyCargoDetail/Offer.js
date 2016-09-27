import React from 'react';
import { Modal, Button } from 'antd-mobile';
import { createForm } from 'rc-form';

class Offer extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose() {
    const { onClose } = this.props;
    onClose();
  }

  handleSubmit() {
    const { onSubmit } = this.props;
    onSubmit();
  }

  render() {
    const { visible, payInfo } = this.props;
    return (
      <Modal
        visible={visible}
        className="mycargo-offer-modal"
        style={{
          width: 'auto',
          height: 'auto',
        }}
        >
        <h3>确认订货</h3>
        <div className="mycargo-offer">
          <div className="text">
            <span className="price">¥{payInfo.totalFee}</span>
            <span className="divider"></span>
            信息费
          </div>
          <div className="offer">
            <div className="form-item first">
              <div>使用{payInfo.amount}信息豆抵扣<span className="price">{payInfo.reduceFee}</span></div>
            </div>
            <div className="form-item price-wrapper">
              <div>剩余<span className="price">{payInfo.balance}</span></div>
            </div>
          </div>
          <div className="text">实付款：¥{payInfo.actualFee}</div>
          <Button inline className="confirm-btn" onClick={this.handleSubmit}>支付</Button>
        </div>
      </Modal>
    );
  }
}
const _Offer = createForm()(Offer);
export default _Offer;
