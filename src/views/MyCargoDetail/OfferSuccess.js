import React from 'react';
import { Button } from 'antd-mobile';

class OfferSuccess extends React.Component {
  constructor(props) {
    super(props);

    this.handleBack = this.handleBack.bind(this);
  }

  handleBack() {
    this.context.router.goBack();
  }

  render() {
    return (<div className="page offer-success">
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
        <Button inline className="confirm-btn" onClick={this.handleBack}>返回</Button>
      </div>
    </div>);
  }
}

OfferSuccess.contextTypes = {
  router: React.PropTypes.object,
};

export default OfferSuccess;
