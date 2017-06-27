import './Base.css';
import React, { PropTypes } from 'react';
import App from '../App/App';
import { browserHistory, Link } from 'react-router';
import Auth from '../Auth/Auth';
import SearchPage from '../Search/SearchPage';


let $ = window.jQuery;

class Base extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInput:'',
        };
    }

    componentDidMount() {
        $('.button-collapse').sideNav();
    }

    render() {
        return (
    <div>
  <nav className="">
   <div className="nav-wrapper">
      <a href="/" className="brand-logo"><i className="material-icons">loyalty</i> TopNews</a>
      <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>


      <ul className="right hide-on-med-and-down">
            <li><Link to='/search'><i className="fa fa-search"></i> Search News</Link></li>   

           {Auth.isUserAuthenticated() ?
             (<li>
                <li> {Auth.getEmail()} </li>
                <li><Link to="/logout">Log out</Link></li>
              </li>)
              :
             (<li>
                <li><Link to="/login">Log in</Link></li>
                <li><Link to="/signup">Sign up</Link></li>
              </li>)
           }
      </ul>

      <ul className="side-nav" id="mobile-demo">
        {Auth.isUserAuthenticated() ?
             (<li>
                <li>{Auth.getEmail()}</li>
                <li><Link to="/logout">Log out</Link></li>
              </li>)
              :
             (<li>
                <li><Link to="/login">Log in</Link></li>
                <li><Link to="/signup">Sign up</Link></li>
              </li>)
           }
      </ul>
    </div>
  </nav>

     <br/>
        {
          (this.props.children)
        }
   </div>
   );
    }

}


// Base.propTypes = {
// 	children: PropTypes.object.isRequired
// };

export default Base;
