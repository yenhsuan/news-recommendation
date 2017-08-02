import './DemoPanel.css';
import React from 'react';
import DemoCard from './DemoCard';
import ReactTooltip from 'react-tooltip';

class DemoPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {news:null, pageNum:1, loadedAll:false};
  }

  componentDidMount() {
    this.loadNews();
  }


  loadNews() {
    if (this.state.loadedAll === true) {
      console.log('no more news!');
      return;
    }

    let url = '/newsdemo';

    let request = new Request(encodeURI(url), {
      method: 'GET',
      headers: {
      },
      cache: 'no-cache'
    });



    console.log('send demo news request!');
    console.log(url);

    fetch(request)
      .then((res) => res.json())
      .then((news) => {
          this.setState({loadedAll: true});

        console.log('Got news!');

        this.setState({
          news: news,
        });
      });
  }

  renderNews() {
    const news_list = this.state.news.map(function(news) {
      return (
          <DemoCard news={news} />
      );
    });

    return (
        <div className='row'>
            {news_list}
        </div>
    );
  }

  render() {
    //console.log('Search:' + this.props.keyword);

    if (this.state.news) {
      return (
        <div>
          {this.renderNews()}
        
          {this.state.loadedAll &&
            <div className="btnDiv">
              <button className="waves-effect waves-light btn blue" data-tip="Please log in !">Load More</button>
              <ReactTooltip place="top" type="dark" effect="solid"/>
            </div>
          }
        </div>
      );
    } else {
      return (
        <div>
              <div className="row">
              <div className="bar-div">
              <div className="progress col s12 m6 l4 offset-m3 offset-l4">
                
                <div className="indeterminate"></div>
              </div>
              </div>
              </div>
        </div>
      );
    }
  }
}

export default DemoPanel;
