import React from 'react';
import { Link } from 'react-router';
import Offer from './Offer';
import Upload from './Upload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { WingBlank, Table, Toast, Button, Modal } from 'antd-mobile';
import './_mycargoDetail';
import request from 'superagent-bluebird-promise';
import url from '../../utils/url';
import mapIcon from './map-icon.png';

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
      loadAddressInfo:{},
      unloadAddressInfo:{},
    };

    this.cloneChildren = this.cloneChildren.bind(this);
    this.handleMessageOpen = this.handleMessageOpen.bind(this);
    this.handleMessageClose = this.handleMessageClose.bind(this);

    this.handleOfferOpen = this.handleOfferOpen.bind(this);
    this.handleOfferClose = this.handleOfferClose.bind(this);
    this.handleLoginOpen = this.handleLoginOpen.bind(this);
    this.handleJumpLogin = this.handleJumpLogin.bind(this);

    this.handleUploadOpen = this.handleUploadOpen.bind(this);
    this.handleUploadClose = this.handleUploadClose.bind(this);
  }

  cloneChildren() {
    const path = this.props.location.pathname;
    const { driverInfo } = this.state;
    if (this.props.children) {
      return React.cloneElement(this.props.children, { key: path, driverInfo });
    }
    return null;
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

  componentDidMount() {
    this.prepareData();
  }


  // 获取货源信息
  prepareData() {
    const uuid = sessionStorage.getItem('uuid');
    const _data = {
      data: {
        orderId: this.props.params.id.toString(),
        type: 'ORDER_DETAIL',
      },
      service: 'SERVICE_ORDER',
      uuid,
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
          projectInfo: resultData.result.projectInfo,
          loadAddressInfo: resultData.result.loadAddressInfo,
          unloadAddressInfo: resultData.result.unloadAddressInfo,
        });
      } else {
        Toast.fail(resultData.msg);
      }
    });
  }

  render() {
    const {
      messageVisible,
      loginVisible,
      offerVisible,
      uploadVisible,
    } = this.state;
    const { cargoInfo, projectInfo, loadAddressInfo, unloadAddressInfo} = this.state;

    const data = [{
      title: '司机人数',
      name: projectInfo.driverNum || '',
      key: '1',
    }, {
      title: '防护环境',
      name: projectInfo.protect || '',
      key: '2',
    }, {
      title: '车辆环境',
      name: projectInfo.envRqmt || '',
      key: '3',
    }, {
      title: '装卸要求',
      name: projectInfo.envRqmt || '',
      key: '4',
    }, {
      title: '配载要求',
      name: projectInfo.allocRqmt || '',
      key: '5',
    }, {
      title: '装货方式',
      name: projectInfo.loadType || '',
      key: '6',
    }, {
      title: '司机自带工具',
      name: projectInfo.carTools || '',
      key: '7',
    }, {
      title: '到场时间要求',
      name: projectInfo.arrivalTimeRqmt || '',
      key: '8',
    }, {
      title: '装载时长',
      name: projectInfo.loadTime || '',
      key: '9',
    }, {
      title: '卸载时长',
      name: projectInfo.unloadTime || '',
      key: '10',
    }, {
      title: '装卸货费用',
      name: projectInfo.loadCast || '',
      key: '11',
    }];

    // 伪造数据
    // cargoInfo.status = 99;
    // if (cargoInfo.status === 99) {
    //   data = data1;
    // } else {
    //   data = data2;
    // }
    // const { projectInfo } = this.state;
    const loadLinkMobile = `tel: + ${loadAddressInfo.linkMobile}`;
    const unloadLinkMobile = `tel: + ${unloadAddressInfo.linkMobile}`;
    const linkTo = `/my-cargo/${this.props.params.id}/map`;

    return (
      <div className="cargo-detail">
        <div className="order">订单编号：{cargoInfo.orderNum}</div>
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
        <div className="block">
          <h4 className="title">项目信息</h4>
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
        </div>
        <div className="block">
          <h4 className="title">装卸货信息</h4>
          <div className="people-info">
            <div className="people-info-item">
              <div>装货地址: {loadAddressInfo.address}</div>
              <a href="{loadLinkMobile}" className="people-contact">联系人电话</a>
            </div>
            <div className="people-info-item">
              <div>卸货地址: {unloadAddressInfo.address}</div>
              <a href="unloadLinkMobile" className="people-contact">联系人电话</a>
            </div>
            <Link className="map-icon" to="{linkTo}">
              <img src={mapIcon}/>
            </Link>
          </div>
        </div>
        <Button className="apply-for" onClick={this.handleMessageOpen}>支付</Button>
        <ReactCSSTransitionGroup transitionName="pageSlider"
          transitionEnterTimeout={600} transitionLeaveTimeout={600}>
          {this.cloneChildren()}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default CargoDetail;
