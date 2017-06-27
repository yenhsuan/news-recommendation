import React, { Component } from 'react';
import './DemoPage.css';
import DemoPanel from './DemoPanel';


class DemoPage extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div>
            <div className='container'>
            {
                    (<DemoPanel />)
            }
            </div>
          </div>
        );
  	}
}

export default DemoPage;
