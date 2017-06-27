import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import NewsPanel from '../NewsPanel/NewsPanel';


class App extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div>
            <img className='logo' src={logo} alt='logo' />
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
