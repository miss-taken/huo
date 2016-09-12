import React from 'react';
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
      // 详情
      infoVisible: false,
      // 上传
      uploadVisible: false,
    };

    this.handleMessageOpen = this.handleMessageOpen.bind(this);
    this.handleMessageClose = this.handleMessageClose.bind(this);
  }

  handleMessageOpen() {
    this.setState({
      messageVisible: true,
    });
  }

  handleMessageClose() {
    this.setState({
      messageVisible: false,
    });
  }

  render() {
    const { messageVisible } = this.state;
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
        </WingBlank>
        <Button className="apply-for" onClick={this.handleMessageOpen}>申请</Button>
      </div>
    );
  }

  componentDidMount(){
    this.prepareData();
  }

  // 获取货源信息
  prepareData() {
    const data = {
      data: {
        cargoId: this.props.params.id,
        type: 'CARGO_SIMPLE',
      },
      service: 'SERVICE_CARGO',
      uuid:'',
      timestamp: '',
      signatures: '',
    };
    request.post(url.webapp)
    .withCredentials()
    .send(data)
    .then((res) => {
      console.log(res.msg);
      if (res.success) {
        Toast.success(res.msg);
      } else {
        Toast.fail(res.msg);
      }
    });
  }
}

export default CargoDetail;
