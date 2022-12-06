import React, { Component } from "react";

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'

class Register extends Component{
    constructor(props) {
        super (props)
        this.state ={
                name: '',
                email: '',
                password: '',
                role: {n:true},
                ou: null,
                division: null,
                message: ''
        }
        this.input = this.input.bind(this)
        this.submit = this.submit.bind(this)
    }
    // sets state based on registeration input
    input(event){

        const name = event.target.name;
        const value = event.target.value;

        switch(name){
            case "passwordCheck":
                if (value != this.state.password){
                    this.setState({message: "Passwords don't match"})
                }else{
                    this.setState({message: "match"})
                }
                break;
            case "role":
                if(value == 'm'){
                    this.setState({role:{m:true, n:false}})
                }
                else if(value == 'a'){
                    this.setState({role:{a:true, n:false}})
                }else{
                    this.setState({role:{n:true}})
                }
                break;
            default:
                this.setState({
                    [name] : value
                 });
        }
        
    }

    // sends state data to server
    submit(event){
        const data = this.state
        
        fetch('/register', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data), 
            })
            // parses response to JSON
            .then(response => response.json()) 
            // returns back message from server
            .then(
                (result) => {
                    this.setState({
                        message: result.data
                    })
                }
            )
    }
    render(){

        return(
                <Container fluid>
                    <h1>Register</h1>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name='name' onChange={this.input} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" name='email' onChange={this.input} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name='password' onChange={this.input} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name='passwordCheck' onChange={this.input} required/>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Role</Form.Label>
                            <Form.Select onChange={this.input}  name="role" >
                                <option>Normal</option>
                                <option value='m'>Manager</option>
                                <option value='a'>Admin</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Operation Unit</Form.Label>
                            <Form.Select onChange={this.input}  name="ou" required>
                                <option>select</option>
                                <option value='news'>News</option>
                                <option value='software'>Software</option>
                                <option value='hardware'>Hardware</option>
                                <option value='opinion'>Opinion</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Division</Form.Label>
                            <Form.Select onChange={this.input}  name="division" required>
                                <option>select</option>
                                <option value='finance'>Finance</option>
                                <option value='it'>IT</option>
                                <option value='writing'>Writing</option>
                                <option value='hr'>HR</option>
                                <option value='dev'>Development</option>
                                <option value='sales'>Sales</option>
                            </Form.Select>
                        </Form.Group>
                        <p className="msg">{this.state.message}</p>
                        <Button onClick={this.submit}>Register</Button>
                        <Button href="/">Login</Button>
                    </Form>
                </Container>
            
        )
    }
}

export default Register