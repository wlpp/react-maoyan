import React, { Component } from 'react';
import Home from './containers/home/home'
import Movie from './containers/movie/movie'
import Detail from './containers/detail/detail'
import Trailer from './containers/trailer/trailer'
import Cinema from './containers/cinema/cinema'
import Ranking from './containers/ranking/ranking'
import Hot from './containers/hot/hot'
import Login from './containers/user/login'
import Reg from './containers/user/reg'
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import './assets/css/base.css'
import 'element-theme-default';
class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
      <Switch>
        <Route exact path="/" render={() =><Redirect to='/index'></Redirect>}/>
        <Route exact path="/index" component={Home} />
        <Route path="/movie" component={Movie} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/trailer/:id" component={Trailer} />
        <Route path="/cinema/" component={Cinema} />
        <Route path="/ranking/" component={Ranking} />
        <Route path="/hot/" component={Hot} />
        <Route path="/login" component={Login} />
        <Route path="/reg" component={Reg} />
      </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
