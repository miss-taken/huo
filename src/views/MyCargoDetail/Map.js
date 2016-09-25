import React from 'react';
import request from 'superagent-bluebird-promise';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'gaosu',
    };

    this.handleActive = this.handleActive.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
  }

  handleActive(type, e) {
    e.preventDefault();
    this.setState({ active: type });
  }

  renderMenu() {
    const { active } = this.state;
    if (active === 'gaosu') {
      return (
        <div className="map-menu">
          <a href="#" onClick={this.handleActive.bind(this, 'gaosu')} className="active">高速优先</a>
          <a href="#" onClick={this.handleActive.bind(this, 'guodao')}>国道/省道</a>
        </div>
      );
    }
    return (
      <div className="map-menu">
        <a href="#" onClick={this.handleActive.bind(this, 'gaosu')}>高速优先</a>
        <a href="#" onClick={this.handleActive.bind(this, 'guodao')} className="active">国道/省道</a>
      </div>
    );
  }

  componentDidMount() {
    const { cargoInfo } = this.props;
    if (cargoInfo) {
      // arrivalCityStr,
      const { startCityStr } = cargoInfo;
      request.get('http://restapi.amap.com/v3/geocode/geo')
      .query({
        key: '4932838f85177d06a6b9ba2c2e9b7964',
        address: startCityStr,
      })
      .then((res) => {
        const data = res.body;
        const center = data.geocodes[0].location.split(',');
        console.log('res geo', center);
        const map = new AMap.Map('container');
        map.setZoom(10);
        map.setCenter(center);
        return null;
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('next', nextProps);
  }
  render() {
    return (
      <div className="page">
        <div>
          {this.renderMenu()}
          <div id="container" style={{
            witdh: '100%',
            height: '600px',
          }}></div>
        </div>
      </div>
    );
  }
}

export default Map;
