import React from 'react';
import Offer from './Offer';
import Upload from './Upload';
import { WingBlank, Table, Button, Modal } from 'antd-mobile';
import './_cargoDetail';
import { postRequest } from '../../utils/web';

const columns = [
  { title: '标题', dataIndex: 'title', key: 'title' },
  { title: '名字', dataIndex: 'name', key: 'name' },
];

class CargoDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      // 提示信息
      messageVisible: false,
      // 跳转登录
      loginVisible: false,
      // 详情
      offerVisible: false,
      // 上传
      uploadVisible: false,
      cargoInfo: {},
      projectInfo: {},
      submited: false,

    };

    this.handleApply = this.handleApply.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessageOpen = this.handleMessageOpen.bind(this);
    this.handleMessageClose = this.handleMessageClose.bind(this);

    this.handleOfferOpen = this.handleOfferOpen.bind(this);
    this.handleOfferClose = this.handleOfferClose.bind(this);
    this.handleLoginOpen = this.handleLoginOpen.bind(this);
    this.handleJumpLogin = this.handleJumpLogin.bind(this);

    this.handleUploadOpen = this.handleUploadOpen.bind(this);
    this.handleUploadClose = this.handleUploadClose.bind(this);

    this.renderOffer = this.renderOffer.bind(this);
    this.renderBtn = this.renderBtn.bind(this);

    this.handleHiddenBtn = this.handleHiddenBtn.bind(this);
    this.httpRequest = postRequest.bind(this);
  }

  handleHiddenBtn() {
    this.setState({ submited: true });
  }

  handleApply() {
    const uuid = localStorage.getItem('uuid');
    // 未登录
    if (uuid === undefined || uuid === null) {
      return this.setState({ loginVisible: true });
    }
    // 已登录未上传证件
    return this.setState({ offerVisible: true });
  }

  handleSubmit() {
    console.log('hello');
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
    this.context.router.push('/login');
  }

  // 上传弹出层
  handleUploadOpen() {
    this.setState({ uploadVisible: true });
  }

  handleUploadClose() {
    this.setState({ uploadVisible: false });
  }

  handleOfferClose() {
    this.setState({ offerVisible: false });
  }

  renderOffer() {
    const { offerVisible, cargoInfo } = this.state;
    return (
      <Offer
        onHidden={this.handleHiddenBtn}
        visible={offerVisible}
        onClose={this.handleOfferClose}
        cargoInfo={cargoInfo}
      />
    );
  }

  renderBtn() {
    return <Button className="apply-for" onClick={this.handleApply}>申请</Button>;
  }
  render() {
    const {
      messageVisible,
      loginVisible,
      offerVisible,
      uploadVisible,
      submited,
    } = this.state;
    const { cargoInfo, projectInfo } = this.state;
    // const { projectInfo } = this.state;
    const data = [{
      title: '司机人数',
      name: projectInfo.driverNum || 1,
      key: '1',
    }, {
      title: '防护环境',
      name: projectInfo.protect || '无',
      key: '2',
    }, {
      title: '车辆环境',
      name: projectInfo.envRqmt || '无要求',
      key: '3',
    }, {
      title: '装卸要求',
      name: projectInfo.loadRqmt || '厂家负责卸货',
      key: '4',
    }, {
      title: '配载要求',
      name: projectInfo.allocRqmt || '不可配载',
      key: '5',
    }];

    return (
      <div className="cargo-detail">
        <div className="info">
          <div className="info-place">
            {cargoInfo.startCityStr} → {cargoInfo.arrivalCityStr}
            <span className="span-divider"></span>
            {cargoInfo.sendTimeStr}
          </div>
          <div>
            <div className="info-item">
              货物名称： {cargoInfo.cargoName}
            </div>
            <div className="info-item">
              吨位方量： {cargoInfo.weight}吨/{cargoInfo.cubic}平方
            </div>
            <div className="info-item">
              车辆需求： {cargoInfo.carTypeStr}
              <span className="span-divider"></span>
              {cargoInfo.carLengthStr}
            </div>
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
          {
            offerVisible === true ? this.renderOffer() : null
          }
          <Upload
            visible={uploadVisible}
            onClose={this.handleUploadClose}
          />
        </WingBlank>
        { submited === false ? this.renderBtn() : null }
      </div>
    );
  }

  componentDidMount() {
    this.prepareData();
  }

  // 获取货源信息
  prepareData() {
    const _data = {
        cargoId: this.props.params.id,
        type: 'CARGO_SIMPLE',
      };
    const service = 'SERVICE_CARGO';
   this.httpRequest(data,service,(returnData)=>{
      this.setState({
        cargoInfo: returnData.result,
        projectInfo: returnData.result.projectInfo,
      });
   },(returnData)=>{

   });
  }
}

CargoDetail.contextTypes = {
  router: React.PropTypes.object,
};
export default CargoDetail;
