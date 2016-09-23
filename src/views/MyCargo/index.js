import React, { Component } from 'react';
import { ListView, Toast } from 'antd-mobile';
import { Link } from 'react-router';
import request from 'superagent-bluebird-promise';
import url from '../../utils/url';
import './_myCargo';


const NUM_ROWS = 20;
let pageIndex = 0;
class MyCargo extends Component {

  constructor(props) {
    super(props);
    this.rData = {};

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.genData = (pIndex = 0) => {
      const dataBlob = {};
      for (let i = 0; i < NUM_ROWS; i++) {
        const ii = (pIndex * NUM_ROWS) + i;
        dataBlob[`${ii}`] = `row - ${ii}`;
      }
      return dataBlob;
    };
    this.state = {
      currPage: 1,
      totalPage: 2,
      orderList: [],
      dataSource: dataSource.cloneWithRows(this.genData()),
      isLoading: false,
    };
  }

  onEndReached(event) {
    // load new data
    console.log('reach end', event);
    let { currPage } = this.state;
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = { ...this.rData, ...this.genData(++currPage) };
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    const { orderList } = this.state;
    const { orderId } = this.props.params;
    let index = orderList.length - 1;
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        backgroundColor: '#F5F5F9',
        height: 8,
        borderTop: '1px solid #ECECED',
        borderBottom: '1px solid #ECECED',
      }} />
    );
    let row;    
    if (index <= 0) {
      row = () => <div></div>;
    } else {
      row = (rowData, sectionID, rowID) => {
      if (index < 0) {
          index = orderList.length - 1;
      }
      console.log('rowData:::'+rowData);
      const obj = orderList[index--];
      console.log('obj :::: '+obj);
       return (
          <Link to={`/my-cargo/${obj.id}`}>
            <div key={rowID}
              style={{
                backgroundColor: 'white',
              }}
            />
            <div className="panel">
                <div className="panel-info">
                  <div>{obj.sendTimeStr}</div>
                  <div>{obj.startCityStr}→{obj.arrivalCityStr}</div>
                </div>
                <div style={{ display: 'inline-block' }}>
                  <p>
                    {obj.cargoName}
                    <span className="span-divider"></span>
                    {obj.weight}吨/{obj.cubic}立方
                  </p>
                  <p>
                    {obj.carTypeStr}
                    <span className="span-divider"></span>
                    {obj.carLengthStr}
                  </p>
                </div>
                <div className="trapezoid">{obj.statusStr}</div>
            </div>
          </Link>
      );
      }
    }
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
    this.requestForCargo(this.state.currPage = 1);
  }

  requestForCargo(page) {
    let uuid = sessionStorage.getItem('uuid');
    if (page >= this.state.totalPage) {
      Toast.fail('没有下一页了');
      return;
    }
    if (uuid === undefined) {
      return;
    }
    const requestData = {
      data: {
        currPage: page.toString(),
        type: 'ORDER_LIST_DRIVER',
      },
      service: 'SERVICE_ORDER',
      uuid,
      timestamp: '',
      signatures: '',
    };
    request.post(url.webapp)
    .withCredentials()
    .send(requestData)
    .then((res) => {
      const resultData = JSON.parse(res.text);
      if (resultData.success) {
        Toast.success(resultData.msg);
        this.rData = { ...this.rData, ...this.genData(++pageIndex) };
        this.setState({
          currPage: resultData.result.currPage,
          totalPage: resultData.result.totalPage,
          orderList: resultData.result.objectArray,
          dataSource: this.state.dataSource.cloneWithRows(this.rData),
          isLoading: false,
        });
      } else {
        Toast.fail(resultData.msg);
      }
    });
  }
}

export default MyCargo;
