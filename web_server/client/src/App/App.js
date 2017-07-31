import React, { Component } from 'react';

import './App.css';


import NewsPanel from '../NewsPanel/NewsPanel';


class App extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div>
            
            <div className='container'>
            {
                (<NewsPanel />)
            }
            </div>
          </div>
        );
  	}
}

export default App;
