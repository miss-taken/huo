import React, { Component } from 'react';
import { ListView, Toast } from 'antd-mobile';
import request from 'superagent-bluebird-promise';
import url from '../../utils/url';
import './_cargo';

const _data = [
  {
    title: '相约酒店',
    des: '',
  },
  {
    title: '麦当劳邀您过周末',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    title: '食惠周',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
];
let index = _data.length - 1;
const NUM_ROWS = 20;
let pageIndex = 0;

class Cargo extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.currPage = 1;
    this.totalPage = 2;
    this.genData = (pIndex = 0) => {
      const dataBlob = {};
      for (let i = 0; i < NUM_ROWS; i++) {
        const ii = (pIndex * NUM_ROWS) + i;
        dataBlob[`${ii}`] = `row - ${ii}`;
      }
      return dataBlob;
    };
    this.rData = {};
    this.state = {
      dataSource: dataSource.cloneWithRows(this.genData()),
      isLoading: false,
    };
  }

  onEndReached(event) {
    // load new data
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = { ...this.rData, ...this.genData(++pageIndex) };
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        backgroundColor: '#F5F5F9',
        height: 8,
        borderTop: '1px solid #ECECED',
        borderBottom: '1px solid #ECECED',
      }} />
    );
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = _data.length - 1;
      }
      // const obj = data[index--];
      return (
        <div key={rowID}
          style={{
            backgroundColor: 'white',
          }}
        >
        <div className="panel">
            <div className="panel-info">
              <div>8月24日</div>
              <div>绵阳→广州</div>
            </div>
            <div style={{ display: 'inline-block' }}>
              <p>汽车配件 <span className="span-divider"></span> 28吨/110立方</p>
              <p>平板车 <span className="span-divider"></span> 8.5米</p>
            </div>
            <div className="trapezoid">等待订车</div>
          </div>
        </div>
      );
    };
    return (<div className="cargo">
      <ListView
        dataSource={this.state.dataSource}
        renderHeader={() => <span>header</span>}
        renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '加载完毕'}
        </div>}
        renderRow={row}
        renderSeparator={separator}
        pageSize={4}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={20}
        onScroll={() => { console.log('scroll'); }}
        useBodyScroll
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
      <div className="help">联系客服</div>
    </div>);
  }

  componentDidMount() {
    this.requestForCargo(this.currPage = 1);
  }

  requestForCargo(page) {
    let uuid = sessionStorage.getItem('uuid');
    if (page >= this.totalPage) {
      Toast.fail('没有下一页了');
      return;
    }
    if (uuid === undefined) {
      uuid = '';
      return;
    }
    const requestData = {
      data: {
        currPage: page,
        type: 'CARGO_LIST_COMMEN',
      },
      service: 'SERVICE_CARGO',
      uuid,
      timestamp: '',
      signatures: '',
    };
    console.log('values', requestData);
    request.post(url.webapp)
    .withCredentials()
    .send(requestData)
    .then((res) => {
      if (res.sucess) {
        Toast.success(res.msg);
        this.currPage = res.data.currPage;
        this.totalPage = res.data.totalPage;
        console.log(res.result);
      } else {
        Toast.fail(res.msg);
      }
    });
  }
}

export default Cargo;
