import React, { Component } from "react";

// import boostrap
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class Login extends Component{
    constructor(props) {
        super (props)
        this.input = this.input.bind(this);  
        this.handleLogin = this.handleLogin.bind(this)
    }
    // event input sends input from child component to parent component Main
    input(event){
        const name = event.target.name;
        const value = event.target.value
        if (name == 'email'){
            this.props.onEmail(value);
        }else if (name == 'password'){
            this.props.onPassword(value);
        } 
    }
    // event handleLogin sends onclick event from child component to parent component Main
    handleLogin(){
        this.props.onLogin();
    }
    render(){
            return(
            <Container fluid>
                <h1>Login</h1>
                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name='email' onChange={this.input}/>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' onChange={this.input}/>
                    </Form.Group>
                </Form>
                <Button onClick={this.handleLogin}>Login</Button><Button href="/register">Register</Button>
            </Container>
            )  
    }
}

export default Login