import React from 'react';
import Offer from './Offer';
import Upload from './Upload';
import { WingBlank, Table, Toast, Button, Modal } from 'antd-mobile';
import './_cargoDetail';
import request from 'superagent-bluebird-promise';
import url from '../../utils/url';

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
      cargoInfo: {},
      projectInfo: {},

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
    const { cargoInfo } = this.state;
    const { projectInfo } = this.state;
    return (
      <div className="cargo-detail">
        <div className="info">
          <div className="info-place">{cargoInfo.startCityStr} → {cargoInfo.arrivalCityStr} <span className="span-divider"></span>{cargoInfo.sendTimeStr}</div>
          <div>
            <div className="info-item">货物名称：  {cargoInfo.cargoName}</div>
            <div className="info-item">吨位方量：  {cargoInfo.weight}吨/{cargoInfo.cubic}平方</div>
            <div className="info-item">车辆需求：  {cargoInfo.carTypeStr} <span className="span-divider"></span>{cargoInfo.carLengthStr}</div>
            <div className="info-item">总里程数：  暂未计算</div>
          </div>
          <div className="trapezoid">{cargoInfo.statusStr}</div>
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

  componentDidMount() {
    this.prepareData();
  }

  // 获取货源信息
  prepareData() {
    const _data = {
      data: {
        cargoId: this.props.params.id,
        type: 'CARGO_SIMPLE',
      },
      service: 'SERVICE_CARGO',
      uuid: '',
      timestamp: '',
      signatures: '',
    };

    request.post(url.webapp)
    .withCredentials()
    .send(_data)
    .then((res) => {
      const resultData = JSON.parse(res.text);
      if (resultData.success) {
        Toast.success(resultData.msg);
        this.setState({
          cargoInfo: resultData.result,
          projectInfo: resultData.result.projectInfo
        });
      } else {
        Toast.fail(resultData.msg);
      }
    });
  }
}

export default CargoDetail;
