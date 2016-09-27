import React, { Component } from 'react';
import { ListView } from 'antd-mobile';
import { Link } from 'react-router';
import { postRequest } from "../../utils/web";
import './_cargo';

const NUM_ROWS = 20;
let pageIndex = 0;
class Cargo extends Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
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

    this.rData = {};
    this.state = {
      currPage: 0,
      totalPage: 2,
      cargoList: [],
      dataSource: ds.cloneWithRows(this.genData()),
      isLoading: false,
    };

    this.requestForCargo = this.requestForCargo.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.httpRequest = postRequest.bind(this);
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

  componentDidMount() {
    this.requestForCargo(this.state.currPage = 1);
  }


  requestForCargo(page) {
    const uuid = localStorage.getItem('uuid');
    if (page >= this.state.totalPage) {
      return;
    }
    if (uuid === undefined) {
      return;
    }
    const data = {
        currPage: page.toString(),
        type: 'CARGO_LIST_COMMEN',
    };
    const  serviceName = 'SERVICE_CARGO';
    this.httpRequest(data,serviceName,
       (returnData)=>{
          this.rData = { ...this.rData, ...this.genData(++pageIndex) };
          this.setState({
            currPage: returnData.result.currPage,
            totalPage: returnData.result.totalPage,
            cargoList: returnData.result.objectArray,
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
          });
      }, (returnData)=>{

      });
  }

  render() {
    const { cargoList } = this.state;
    let index = cargoList.length;
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
        if (index === 0) {
          return null;
        }
        const obj = cargoList[cargoList.length - (index--)];
        return (
          <Link to={`/cargo/${obj.cargoId}`}>
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
      };
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
        useBodyScroll
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
      <div className="help">联系客服</div>
    </div>);
  }
}

export default Cargo;
