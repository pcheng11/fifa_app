import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, FormFeedback
} from 'reactstrap';

import { connect } from 'react-redux';
import {registerUser} from '../../actions/authActions.js'
import './Register.scss';
import 'bootstrap/dist/css/bootstrap.css';

/**
 * Register component for the web app
 * Allowing users to register
 */
class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            emailExists: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.errors)
        if (nextProps.errors.emailExists) {
            this.setState({
                emailExists: nextProps.errors.emailExists
            });
        }
    }

    /**
     * submit function 
     */
    submitForm = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.username,
            email: this.state.email,
            password: this.state.password
        };
        this.props.registerUser(newUser, this.props.history);
    };

    /**
     * render the changed text in the input form
     */
    handleChange = async (event) => {
        const { target } = event;
        const value = target.value;
        const { name } = target;
        await this.setState({
            [name]: value,
        });
    }

    /**
     * handle login button
     */
    login = () => {
        this.props.history.push("/login")
    }

    render() {

        return (
            <div className="registerMain">
                <Container className="register">
                    <h2>Register</h2>
                    <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                        <Col>
                            <FormGroup>
                                <Label>Username</Label>
                                <Input
                                    name="username"
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="exampleEmail"
                                    placeholder="myemail@email.com"
                                    invalid={this.state.emailExists != ""}
                                    onChange={(e) => this.handleChange(e)}
                                />
                                <FormFeedback invalid>
                                    Email already exist, please provide another email!
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
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </FormGroup>
                        </Col>
                        <Button outline style={{ padding: "1%", color: 'white' }}>Submit</Button>
                        <Col>
                            <p>Already have an account? <Button outline style={{ color: 'white' }} onClick={() => this.login()}>Login</Button></p>
                        </Col>
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
// registerUser is a dispatch action
export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));
