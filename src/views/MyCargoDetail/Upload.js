import React from 'react';
import { Modal, Button } from 'antd-mobile';
import Dropzone from 'react-dropzone';
import png from './upload-demo.png';
import demo from './default.png';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
    this.openDrop = this.openDrop.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleUpload = this.handleUpload.bind(this);

    this.renderImg = this.renderImg.bind(this);
  }

  openDrop() {
    this.dropzone.open();
  }

  onDrop(files) {
    this.setState({ files });
  }

  handleUpload() {
    const { onClose } = this.props;
    // const { files } = this.files;
    setTimeout(() => onClose(), 2000);
  }

  renderImg() {
    const { files } = this.state;
    if (files.length) {
      return (
        files.map((file, index) => <img className="upload-img" key={index} src={file.preview} />)
      );
    }
    return (
      <img className="upload-img default" src={demo}/>
    );
  }
  render() {
    const { visible } = this.props;
    return (
      <Modal
        visible={visible}
        className="cargo-upload-modal"
        style={{
          width: 'auto',
          height: 'auto',
        }}
      >
        <div className="cargo-upload">
          <div className="text">还差最后一步啦^~^,</div>
          <div className="text">请上传您的行驶证和驾驶证合照</div>
          <img src={png} className="upload-demo"/>
          <Button inline onClick={this.openDrop} className="upload-btn">上传</Button>
          <Dropzone
            ref={(c) => (this.dropzone = c)}
            onDrop={this.onDrop}
            multiple={false}
            className="dropzone"
            >
            <div className="upload-img-wrapper">
              {this.renderImg()}
            </div>
          </Dropzone>
          <Button inline onClick={this.handleUpload} className="submit-btn">提交</Button>
        </div>
      </Modal>
    );
  }
}

export default Upload;
