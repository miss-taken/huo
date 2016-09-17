import React from 'react';
import { Modal, Button } from 'antd-mobile';
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
            <span className="price">¥{200}</span>
            <span className="divider"></span>
            信息费
          </div>
          <div className="offer">
            <div className="form-item first">
              <div>使用{200}信息豆抵扣<span className="price">{20}</span></div>
            </div>
            <div className="form-item price-wrapper">
              <div>剩余<span className="price">{80}</span></div>
            </div>
          </div>
          <div className="text">实付款：¥{180}</div>
          <Button inline className="confirm-btn">支付</Button>
        </div>
      </Modal>
    );
  }
}
const _Offer = createForm()(Offer);
export default _Offer;
