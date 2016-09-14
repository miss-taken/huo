import React from 'react';
// import './style/antd-mobile';
import './style/app';
// import Home from './views/Home';
import url from './utils/url';
import request from 'superagent-bluebird-promise';

class App extends React.Component {
  constructor(props) {
    super(props);

    const re = new RegExp("[&,?]code=([^//&]*)", "i");
    const weChatCodeArray = re.exec(location.href);
    let weChatCode;
    if(weChatCodeArray !== null){
        weChatCode = weChatCodeArray[1];
    }
    this.state = {
      weChatCode: weChatCode,
    };
  }

  componentWillMount() {
    this.doLogin();
  }

  render() {
    return (
      <div>
        {this.props.children || 'Home' }
      </div>
    );
  }

  // 进入app时尝试静默登陆
  doLogin() {
     if(this.state.weChatCode === null){
       return;
     }
      const data = {
        data: {
          mobile: '',
          passWord: '',
          weChatCode: this.state.weChatCode,
        },
        service: 'SERVICE_LOGIN',
        uuid: '',
        timestamp: '',
        signatures: '',
      };
      console.log('data', data);
      request.post(url.webapp)
      .withCredentials()
      .send(data)
      .then((res) => {
        const resultData = JSON.parse(res.text); 
        if (resultData.success) {
          sessionStorage.setItem('uuid', resultData.result.uuid);
        } 
      });
  }
}

App.contextTypes = {
  router: React.PropTypes.object,
};

export default App;
