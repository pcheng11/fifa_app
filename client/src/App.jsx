import React from 'react'
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom'
import Home from './Components/Home/Home'
import Player from './Components/Player/Player';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Team from './Components/Team/Team';
import Landing from './Components/Landing/Landing';
import Profile from './Components/User/Profile';
import ProtectedRoute from './protected.route.jsx';
import { connect } from "react-redux";

class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path={'/'} component={Landing} />
                    <Route exact path={'/login'} component={Login} />
                    <ProtectedRoute auth={this.props.auth} exact path={'/home'} component={Home} /> 
                    <ProtectedRoute auth={this.props.auth} exact path={'/player/:player_id'} component={Player} />
                    <Route auth={this.props.auth} exact path={'/register'} component={Register} />
                    <ProtectedRoute auth={this.props.auth} exact path={'/profile'} component={Profile} />
                    <Route exact path={'/team/:team_id'} component={Team} />
                </Switch>
            </HashRouter>
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth
});
// loginUser is a dispatch action
export default connect(
    mapStateToProps
)((App));