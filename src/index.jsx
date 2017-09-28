import React, { Component } from 'react';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import { render } from 'react-dom';
import axios from 'axios';

const mainFolder = '/project-mam/';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gallery: [],
      folder: 'test',
    };

    this.uploadWidget = this.uploadWidget.bind(this);
  }

  componentDidMount(){
    axios.get('http://res.cloudinary.com/di6bv5utg/image/list/test.json')
      .then((res) => {
        console.log(res.data.resources);
        this.setState({ gallery: res.data.resources });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  uploadWidget() {
    const folder = mainFolder + this.state.folder;
    cloudinary.openUploadWidget({ cloud_name: 'di6bv5utg', upload_preset: 'testing_123', tags: ['test'], folder: folder, theme: 'minimal'},
      function(error, result) {
        console.log(result);
      });
  }
 
  render() {
      return (
          <div className="main">
              <h1>Galleria</h1>
              <div className="upload">
                <button onClick={this.uploadWidget} className="upload-button">
                  Add Image
                </button>
              </div>
              <div className="gallery">
                <CloudinaryContext cloudName="di6bv5utg">
                  {
                    this.state.gallery.map(data => {
                      return (
                        <div className="responsive" key={data.public_id}  >
                          <div className="img">
                            <a target="_blank" href={`http://res.cloudinary.com/di6bv5utg/image/upload/v1505145075/${data.public_id}.jpg`}>
                              <Image publicId={data.public_id}></Image>
                            </a>
                            <div className="desc">Created at {data.created_at}</div>
                          </div>
                        </div>
                      )
                    })
                  }
                </CloudinaryContext>
                <div className="clearfix"></div>
              </div>
          </div>
      );
  }
}

render(<Home />, document.getElementById('container'));