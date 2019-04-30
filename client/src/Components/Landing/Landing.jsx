import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = {
    grow: {
        flexGrow: 1
    },
    
    bar: {
        background: 'black',
        position: "absolute"
    },
    button: {
        background: 'black',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 60,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)', 
        margin: 0,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }
};

/**
 * React Component for landing page
 */
class Landing extends React.Component {
    
    
    register = () => {
        this.props.history.push("/register")
    }
    render() {
        const {classes} = this.props;
        return(
            <div style={{ height: '100%', width: '100%' }}>
                <AppBar className={ classes.bar }>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Fifa App
                        </Typography>
                        <Button color="inherit" onClick={() => this.props.history.push("/register")}>Sign Up</Button>
                        <Button color="inherit" onClick={() => this.props.history.push("/login")}>Login</Button>
                    </Toolbar>
                </AppBar>
                    <Button onClick={this.register} className={classes.button}>Register</Button>
            </div>
        );
    }
}

export default withStyles(styles)(Landing);