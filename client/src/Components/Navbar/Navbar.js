import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import '../Home/Home.scss';
// import GoogleAuth from '../Auth/GoogleAuth.jsx';
import { logoutUser } from "../../actions/authActions";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
/**
 * Navbar component for  the web app using redux
 */
class NavbarHeader extends React.Component  {

    state = {
        activeItem: this.props.activeItem, isAuthenticated: this.props.auth.isAuthenticated, open: false,
        };


    /**
     * will receive user auth
     */
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.auth.isAuthenticated)
        this.setState({
            isAuthenticated: nextProps.auth.isAuthenticated
        });
    }
    
    /**
     * Right top button toggle function
     */
    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    /**
     * helper function handling close
     */
    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };


    renderLoginRegister = (state) => {
        const {open } = state;
        if (this.props.auth.isAuthenticated) {
            return (
                <div>
                <Button
                    
                    style={{ color: 'white'}}
                    buttonRef={node => {
                        this.anchorEl = node;
                    }}
                    aria-owns={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleToggle}
                >
                    Hi! {this.props.auth.user.name}
                </Button>
                <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            id="menu-list-grow"
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <MenuList>
                                        <MenuItem onClick={() => this.props.history.push("/profile")}>Profile</MenuItem>
                                        <MenuItem onClick={() => this.props.logoutUser(this.props.history)}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
                </div>
            );
        }
    };

    handleItemClick = (name) => {
        this.setState({ activeItem: name });
        if (name === 'home') {
            this.props.history.push('/home');
        }
    };

    render() {

        return(
            <AppBar style={{ backgroundColor: 'black', color: 'white'}}>
                <Toolbar>
                    <Typography variant="h6" 
                                color="inherit" 
                                style={{ flexGrow: 1, cursor: 'pointer'}}
                                onClick={() => this.props.history.push("/home")}>
                            Fifa App
                    </Typography>
                    {this.renderLoginRegister(this.state)}
                </Toolbar>
            </AppBar>
        );
    }

}
//get state from redux store and map it to props
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(withRouter(NavbarHeader));