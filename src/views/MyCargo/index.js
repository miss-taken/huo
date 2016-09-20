import React, { Component } from 'react';
import { ListView, Toast } from 'antd-mobile';
import { Link } from 'react-router';
import request from 'superagent-bluebird-promise';
import url from '../../utils/url';
import './_myCargo';


class MyCargo extends Component {

  constructor(props) {
    super(props);
    this.rData = {};

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.genData = (pIndex = 1) => {
      const dataBlob = {};
      for (let i = 0; i < this.state.orderList.length; i++) {
        const ii = ((pIndex - 1) * 20) + i;
        dataBlob[`${ii}`] = this.state.orderList[ii];
        console.log(dataBlob);
      }
      return dataBlob;
    };
    this.state = {
      currPage: 1,
      totalPage: 2,
      orderList: [],
      dataSource,
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
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        backgroundColor: '#F5F5F9',
        height: 8,
        borderTop: '1px solid #ECECED',
        borderBottom: '1px solid #ECECED',
      }} />
    );
    const row = (rowData, sectionID, rowID) => (
        <Link to="/cargo/778">
          <div key={rowID}
            style={{
              backgroundColor: 'white',
            }}
          />
          <div className="panel">
              <div className="panel-info">
                <div>{rowData.sendTimeStr}</div>
                <div>{rowData.startCityStr}→{rowData.arrivalCityStr}</div>
              </div>
              <div style={{ display: 'inline-block' }}>
                <p>
                  {rowData.cargoName}
                  <span className="span-divider"></span>
                  {rowData.weight}吨/{rowData.cubic}立方
                </p>
                <p>
                  {rowData.carTypeStr}
                  <span className="span-divider"></span>
                  {rowData.carLengthStr}
                </p>
              </div>
              <div className="trapezoid">{rowData.statusStr}</div>
          </div>
        </Link>
    );
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
      console.log(this);
      if (resultData.success) {
        Toast.success(resultData.msg);
        this.state = {
          currPage: resultData.result.currPage,
          totalPage: resultData.result.totalPage,
          orderList: resultData.result.objectArray,
          dataSource: this.state.dataSource.cloneWithRows(this.genData(this.state.currPage)),
          isLoading: false,
        };
        console.log(this.state.orderList);
      } else {
        Toast.fail(resultData.msg);
      }
    });
  }
}

export default MyCargo;
