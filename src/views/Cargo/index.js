import React, { Component } from 'react';
import { ListView } from 'antd-mobile';
import './_cargo';
import a from './a.png';

const data = [
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
let index = data.length - 1;
const NUM_ROWS = 20;
let pageIndex = 0;

class Cargo extends Component {
  constructor(props) {
    super(props);
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
        index = data.length - 1;
      }
      // const obj = data[index--];
      return (
        <div key={rowID}
          style={{
            backgroundColor: 'white',
          }}
        >
        <div className="panel">
            <img
              style={{ height: 64 * (window.viewportScale || 1), marginRight: 8 }}
              src={a} />
            <div style={{ display: 'inline-block' }}>
              <p>汽车配件  28吨/110立方</p>
              <p>平板车 8.5米</p>
            </div>
            <div className="cargo-tip">等待订车</div>
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
    </div>);
  }
}


export default Cargo;
