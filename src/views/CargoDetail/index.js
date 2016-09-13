import React from 'react';
import { WingBlank, Table, Button, Modal } from 'antd-mobile';
import Offer from './Offer';
import Upload from './Upload';
import './_cargoDetail';

const columns = [
  { title: '标题', dataIndex: 'title', key: 'title' },
  { title: '名字', dataIndex: 'name', key: 'name' },
];

const data = [{
  title: '司机人数',
  name: '1人',
  key: '1',
}, {
  title: '防护环境',
  name: '无',
  key: '2',
}, {
  title: '车辆环境',
  name: '无要求',
  key: '3',
}, {
  title: '装卸要求',
  name: '厂家负责装卸',
  key: '4',
}, {
  title: '配载要求',
  name: '不可配载',
  key: '5',
}];

class CargoDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // 提示信息
      messageVisible: false,
      // 跳转登录
      loginVisible: false,
      // 详情
      offerVisible: true,
      // 上传
      uploadVisible: false,
    };

    this.handleMessageOpen = this.handleMessageOpen.bind(this);
    this.handleMessageClose = this.handleMessageClose.bind(this);

    this.handleOfferOpen = this.handleOfferOpen.bind(this);
    this.handleOfferClose = this.handleOfferClose.bind(this);
    this.handleLoginOpen = this.handleLoginOpen.bind(this);
    this.handleJumpLogin = this.handleJumpLogin.bind(this);

    this.handleUploadOpen = this.handleUploadOpen.bind(this);
    this.handleUploadClose = this.handleUploadClose.bind(this);
  }

  handleMessageOpen() {
    this.setState({
      messageVisible: true,
    });
  }

  // 报价弹出层
  handleOfferOpen() {
    this.setState({
      offerVisible: true,
    });
  }

  handleOfferClose() {
    this.setState({
      offerVisible: false,
    });
  }

  // 成功弹出层
  handleMessageClose() {
    this.setState({
      messageVisible: false,
    });
  }

  handleLoginOpen() {
    this.setState({
      messageVisible: false,
    });
  }

  // 注册提示弹出层
  handleLoginOpen() {
    setTimeout(() => (location.href = '/#/login'), 5000);
    this.setState({
      loginVisible: true,
    });
  }

  handleJumpLogin() {
    location.href = '/#/login';
  }

  // 上传弹出层
  handleUploadOpen() {
    this.setState({ uploadVisible: true });
  }

  handleUploadClose() {
    this.setState({ uploadVisible: false });
  }

  render() {
    const {
      messageVisible,
      loginVisible,
      offerVisible,
      uploadVisible,
    } = this.state;
    return (
      <div className="cargo-detail">
        <div className="info">
          <div className="info-place">绵阳 → 广州 <span className="span-divider"></span>8月24日</div>
          <div>
            <div className="info-item">货物名称：  汽车配件</div>
            <div className="info-item">吨位方量：  28吨/110平方</div>
            <div className="info-item">车辆需求：  平板车 <span className="span-divider"></span>8.5米</div>
            <div className="info-item">总里程数：  333公里</div>
          </div>
          <div className="trapezoid">等待订车</div>
        </div>
        <div>
          <h4 className="title">项目信息</h4>
        </div>
        <WingBlank>
          <Table
            direction="horizon"
            columns={columns}
            dataSource={data}
          />
          <Modal
            transparent
            onClose={this.handleMessageClose}
            visible={messageVisible}
            className="message-modal"
            style={{
              width: 'auto',
              height: 'auto',
            }}
            footer={[{ text: '返回', onPress: this.handleMessageClose }]}
          >
            <div>提交成功，等待客服联系您...</div>
          </Modal>
          <Modal
            transparent
            visible={loginVisible}
            className="login-modal"
            style={{
              width: 'auto',
              height: 'auto',
            }}
            footer={[{ text: '确认', onPress: this.handleJumpLogin }]}
            >
            <div>您还没注册，需要先注册哦</div>
          </Modal>
          <Offer
            visible={offerVisible}
            onClose={this.handleOfferClose}
          />
          <Upload
            visible={uploadVisible}
            onClose={this.handleUploadClose}
          />
        </WingBlank>
        <Button className="apply-for" onClick={this.handleMessageOpen}>申请</Button>
      </div>
    );
  }
}

export default CargoDetail;
