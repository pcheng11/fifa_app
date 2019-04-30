import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, FormFeedback
} from 'reactstrap';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions.js'
import './Login.scss';
import 'bootstrap/dist/css/bootstrap.css';


/**
 * Login component
 */
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            pwdIncorrect: "",
            emailNotFound: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors.pwdIncorrect) {
            this.setState({
                pwdIncorrect: nextProps.errors.pwdIncorrect
            });
        }
        if (nextProps.errors.emailNotFound) {
            this.setState({
                emailNotFound: nextProps.errors.emailNotFound
            });
        }
    }

    /**
     * handle the user login interaction
     */
    submitForm = e => {
        if (e === "login") {
            const newUser = {
                email: this.state.email,
                password: this.state.password
            };
            this.props.loginUser(newUser, this.props.history);
        } else {
            this.props.history.push("/register")
        }
    };

    /**
     * changes the state upon user's input
     */
    handleChange = async (event) => {
        const { target } = event;
        const value = target.value;
        const { name } = target;
        await this.setState({
            [name]: value,
        });
    }

    render() {

        return (
            <div className="loginMain">
                <Container className="login">
                    <h2>Login</h2>
                    <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                        <Col>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="exampleEmail"
                                    placeholder="myemail@email.com"
                                    invalid={this.state.emailNotFound != ""}
                                    onChange={(e) => this.handleChange(e)}
                                />
                                <FormFeedback invalid>
                                    Email not found!
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="examplePassword"
                                    placeholder="********"
                                    invalid={this.state.pwdIncorrect != ""}
                                    onChange={(e) => this.handleChange(e)}
                                />
                                <FormFeedback invalid>
                                    Password Incorrect!
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Button outline style={{padding: "1%", color: 'white'}} onClick={() => this.submitForm("login")}>Login</Button>
                        <Col>
                            <p>Don't have an account? <Button outline style={{ color: 'white' }} onClick={() => this.submitForm("register")}>Register</Button></p>
                        </Col>
                        {' '}
                        
                    </Form>
                </Container>
            </div>
        );
    }
}

//get state from redux store and map it to props
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
// loginUser is a dispatch action
export default connect(
    mapStateToProps,
    { loginUser }
)(withRouter(Login));
