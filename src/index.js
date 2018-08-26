import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import 'moment-timezone';
import steem from 'steem';

import axios from 'axios';
import reducers from './reducers';

// Styling
import './sass/bootstrap.scss';
import './sass/App.scss';

 // Components
import Bootstrap from './Bootstrap';
import Home from './Home';
import AddNewWords from './AddNewWords'; 


var config = {
    apiKey: "AIzaSyCU76G_PQpUEnyfyoGLrmnkO9v_oqmcr7E",
    authDomain: "dictionary-abfc8.firebaseapp.com",
    databaseURL: "https://dictionary-abfc8.firebaseio.com",
    projectId: "dictionary-abfc8",
    storageBucket: "",
    messagingSenderId: "827239937690"
};
window.firebase.initializeApp(config);
    



ReactDOM.render((
    <Provider store={reducers}>
        <Router>
            <Switch>

            	<Bootstrap>
                	<Route exact path="/" component={ Home } /> 
                    <Route exact path="/new" component={ AddNewWords }/>
                </Bootstrap> 

            </Switch>
        </Router>
    </Provider> 
), document.getElementById('root'));