import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';


import Home from './components/Home/Home';
import Yourpage from './components/Yourpage/Yourpage'
import Comments from './components/Comments/Comments'
import store from './store'
import Sidebar from './components/Home/SideBar/Sidebar'

export default(
<Provider store={store}>
<Switch>
<Route exact path="/" component={Home}/>
<Route path="/yourpage" component={Yourpage}/>
<Route path="/comments" component={Comments}/> 
<Route path="/Sidebar" component={Sidebar}/>

    </Switch>
</Provider>
)