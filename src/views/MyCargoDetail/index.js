import React from 'react';
import { Link } from 'react-router';
import Offer from './Offer';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { WingBlank, Table, Button } from 'antd-mobile';
import './_mycargoDetail';
import { postRequest } from '../../utils/web';
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
      // 详情
      offerVisible: false,
      cargoInfo: {},
      projectInfo: {},
      loadAddressInfo: {},
      unloadAddressInfo: {},
      payInfo: {},
    };

    this.cloneChildren = this.cloneChildren.bind(this);

    this.handleOfferOpen = this.handleOfferOpen.bind(this);
    this.handleOfferClose = this.handleOfferClose.bind(this);

    // 支付按钮
    this.renderBtn = this.renderBtn.bind(this);
    // 地址
    this.renderAddress = this.renderAddress.bind(this);
    // 获取支付信息
    this.getPayInfo = this.getPayInfo.bind(this);
    // 提交支付信息
    this.postPayInfo = this.postPayInfo.bind(this);
    this.httpRequest = postRequest.bind(this);
  }

  cloneChildren() {
    const path = this.props.location.pathname;
    const { cargoInfo } = this.state;
    if (this.props.children) {
      return React.cloneElement(this.props.children, {
        key: path,
        cargoInfo,
        // onSubmit: this.postPayInfo,
      });
    }
    return null;
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

  componentDidMount() {
    this.prepareData();
  }

  // 获取货源信息
  prepareData() {
    const uuid = localStorage.getItem('uuid');
    const data = {
        orderId: this.props.params.id.toString(),
        type: 'ORDER_DETAIL',
      };
    const  service = 'SERVICE_ORDER';
    this.httpRequest(data,service,(returnData)=>{
        this.setState({
          cargoInfo: returnData.result,
          projectInfo: returnData.result.projectInfo,
          loadAddressInfo: returnData.result.loadAddressInfo,
          unloadAddressInfo: returnData.result.unloadAddressInfo,
        });
    },(returnData)=>{

    });
  }

  // 获取支付信息
  getPayInfo() {
    // const uuid = localStorage.getItem('uuid');
    const { id } = this.props.params;
    const data = {
        orderId: id,
        type: 'ORDER_PAYINFO',
      };
   const   service = 'SERVICE_PAY';
   this.httpRequest(data,service,(returnData)=>{
        console.log('success');
   },(returnData)=>{

   });
  }

  // 确认支付
  postPayInfo() {
    // const uuid = localStorage.getItem('uuid');
    const { orderNum } = this.state.cargoInfo;
    // const re = new RegExp('[&,?]code=([^//&]*)', 'i');
    // const weChatCode = re.exec(location.href)[1];
    const code = '123456';
    const data = {
      data: {
        code,
        orderNum,
        url: location.href,
        type: 'ORDER_PAY_POST',
      },
      service: 'SERVICE_PAY',
      uuid: '1212',
      timestamp: '',
      signatures: '',
    };
    request.post(url.webapp)
    .withCredentials()
    .send(data)
    .then(res => {
      const resultData = handleRes(res);
      if (resultData.success) {
        const {
          appId,
          nonceStr,
          timeStamp,
          signatures,
          packageName,
          signType,
          paySign,
          outTradeNo,
        } = resultData.result;
        wx.config({
          // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          debug: false,
          // 必填，公众号的唯一标识
          appId,
          // 必填，生成签名的时间戳
          timeStamp,
          // 必填，生成签名的随机串
          nonceStr,
          // 必填，签名，见附录1
          signatures,
          // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          jsApiList: [
            'checkJsApi',
            'chooseWXPay',
          ],
        });
        wx.ready(() => {
          wx.chooseWXPay({
            timeStamp,
            nonceStr,
            package: packageName,
            signType,
            paySign,
            success: (res) => {
              WeixinJSBridge.log(res.err_msg);
              if (!res.err_msg) {
                location.href = `mobile/pay/wechat_pay_ok.htm?orderId=${outTradeNo}`;
              }
            }
          });
        });

        wx.error((err) => {
          console.log('res', err);
        });

        wx.checkJsApi({
          jsApiList: ['chooseWXPay'],
          success: () => null,
        });
      }
      return null;
    });
    // this.handleOfferClose();
    // this.context.router.push(`/my-cargo/${id}/success`);
  }

  renderBtn() {
    return <Button className="apply-for" onClick={this.getPayInfo}>支付</Button>;
  }

  renderAddress() {
    const {
      loadAddressInfo,
      unloadAddressInfo,
    } = this.state;
    return (
      <div className="block">
        <h4 className="title">装卸货信息</h4>
        <div className="people-info">
          <div className="people-info-item">
            <div>装货地址: {loadAddressInfo.address}</div>
            <a href={`tel:${loadAddressInfo.linkMobile}`} className="people-contact">联系人电话</a>
          </div>
          <div className="people-info-item">
            <div>卸货地址: {unloadAddressInfo.address}</div>
            <a href={`tel:${unloadAddressInfo.linkMobile}`} className="people-contact">联系人电话</a>
          </div>
          <Link className="map-icon" to={`/my-cargo/${this.props.params.id}/map`}>
            <img src={mapIcon}/>
          </Link>
        </div>
      </div>
    );
  }

  render() {
    const {
      offerVisible,
      cargoInfo,
      projectInfo,
      payInfo,
    } = this.state;
    const simpleProjectInfo = [{
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

    const detailProjectInfo = [{
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

    let data;
    if (cargoInfo.status > 99) {
      data = detailProjectInfo;
    } else {
      data = simpleProjectInfo;
    }

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
              <Offer
                onSubmit={this.postPayInfo}
                visible={offerVisible}
                onClose={this.handleOfferClose}
                payInfo={payInfo}
              />
            </WingBlank>
        </div>
        { Number.parseInt(cargoInfo.status, 10) > 99 ? this.renderAddress() : null}
        { Number.parseInt(cargoInfo.status, 10) === 99 ? this.renderBtn() : null}
        <ReactCSSTransitionGroup transitionName="pageSlider"
          transitionEnterTimeout={600} transitionLeaveTimeout={600}>
          {this.cloneChildren()}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

CargoDetail.contextTypes = {
  router: React.PropTypes.object,
};

export default CargoDetail;
