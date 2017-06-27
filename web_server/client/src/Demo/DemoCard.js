import './DemoCard.css';
import React from 'react';
import { chipsColor, chipsName} from '../newsSetting';

class DemoCard extends React.Component {

    constructor(props) {
        super(props);
    }

    redirectToUrl(url) {
        window.open(url, '_blank');
    }

    render() {
        return (
        <div className="col s12 m6 l4" onClick={() => this.redirectToUrl(this.props.news.url)}>
          <div className="card medium">
            <div className="card-image fill">
              <img className="img200" src={this.props.news.urlToImage} />
              <span className="card-title"><div className="title">{this.props.news.title}</div></span>
            </div>
            <div className="card-content">
              <p>{this.props.news.description}</p>
            </div>
            <div className="card-action">
                        {this.props.news.source != null && <div className={chipsColor[this.props.news.source]+ ' labels'}>{chipsName[this.props.news.source]}</div> }
                        {this.props.news.time != null && <div className='amber labels'>NEW!</div>}
            </div>
          </div>
        </div>
        );
    }
}

export default DemoCard;
