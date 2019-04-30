import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { CLIENT_ID } from './secret';
// import { signIn, signOut } from '../../actions';


class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: CLIENT_ID,
                scope: 'email'
            }).then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.onAuthChange(this.auth.isSignedIn.get());
                    this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
        
    }

    onAuthChange = (isSignedIn, name) => {
        if (isSignedIn) {
            this.props.signIn(); //action creater
        } else {
            this.props.signOut();
        }
    };

    onClickSignIn = () => {
        this.auth.signIn();
    };

    onClickSignOut = () => {
        this.auth.signOut();
    };


    displayButton() {
        if (this.props.isSignedIn == null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                {/* <h3 style={{ padding: '5px' }}>Hello, {this.props.name}!</h3> */}
                <Button onClick={this.onClickSignOut} className="ui red google">
                    <i className="google icon"/>
                    Sign Out
                </Button>
                </div>
            );
        } else {
            return (
                <Button onClick={this.onClickSignIn} className="ui red google">
                    <i className="google icon" />
                    Sign In With Google
                </Button>
            );
        }
    }

    render() {
        return <div >
                {this.displayButton()}
              </div>;
    }
}

// whole state in store
const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn,
        name: state.auth.name
    };
};

export default connect(
    mapStateToProps,
    { signIn, signOut }
)(GoogleAuth);