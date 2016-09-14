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
  getInitialState(){
    return{
      cargoInfo :  null,
    }
  }

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
          <div className="info-place">{this.state.cargoInfo.cargo.startCityStr} → {this.state.cargoInfo.cargo.arrivalCityStr} <span className="span-divider"></span>{this.state.cargoInfo.cargo.sendTimeStr}</div>
          <div>
            <div className="info-item">货物名称：  {this.state.cargoInfo.cargo.cargoName}</div>
            <div className="info-item">吨位方量：  {this.state.cargoInfo.cargo.weight}吨/{this.state.cargoInfo.cargo.cubic}平方</div>
            <div className="info-item">车辆需求：  {this.state.cargoInfo.cargo.carTypeStr} <span className="span-divider"></span>{this.state.cargoInfo.cargo.carLengthStr}</div>
            <div className="info-item">总里程数：  暂未计算</div>
          </div>
          <div className="trapezoid">{this.state.cargoInfo.cargo.statusStr}</div>
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


    

    console.log(this.state.cargoInfo);
    request.post(url.webapp)
    .withCredentials()
    .send(_data)
    .then((res) => {
      console.log(res.msg);
      console.log(res.success);
      if (res.success) {
        Toast.success(res.msg);
        this.setState({
          cargoInfo:res.result,
        });
      } else {
        Toast.fail(res.msg);
      }
    });

    const result =  {
        "cargo": {
            "arrivalCityStr": "测试内容872j",
            "carLengthStr": "测试内容e3r1",
            "carTypeStr": "测试内容vm33",
            "cargoName": "测试内容vuj3",
            "cubic": 17665,
            "id": "测试内容37nj",
            "sendTimeStr": "测试内容3t15",
            "startCityStr": "测试内容2p73",
            "status": 55107,
            "statusStr": "测试内容33qu",
            "weight": "测试内容4gw6"
        },
        "projectInfo": {
            "allocRqmt": "测试内容h9zz",
            "driverNum": "测试内容oxdq",
            "envRqmt": "测试内容4ww2",
            "loadRqmt": "测试内容9yrl",
            "protect": "测试内容y699"
        }
    };
    this.setState({
          cargoInfo:result,
    });


  }
}

export default CargoDetail;
