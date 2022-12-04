import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// import components
import Header from './Header'
import Login from './Login'
import Dash from './Dash'
import Register from './Register'

//import boostrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'

class Main extends Component{
    constructor(props) {
        super (props)
        this.state ={
            token : '',
            loggedin: false,
            email:'',
            password:'',
            message: ''

        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    componentDidMount(){
        fetch('/refresh', {
            credentials: 'include',
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            }
            })
            // parses response to JSON
            .then(response => response.json()) 
            // returns back message from server
            .then(
                (result) => {
                    if (result.hasOwnProperty('token')){
                        this.setState({
                            loggedin: true,
                            token: result.token,
                            message: result.data
                        });
                    }else{
                        this.setState({
                            message: result.data
                        })
                    }
                    
                }
            )
    }
    handleEmail(event){
        
        const email = event;
        this.setState({email:email});
    }

    handlePassword(event){
        const password = event;
        this.setState({password:password});
    }

    // this event pass inputed username and password to server
    handleLogin(event){
        const data = {email: this.state.email, password: this.state.password}

        fetch('/login', {
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
                    if (result.hasOwnProperty('token')){
                        this.setState({
                            loggedin: true,
                            token: result.token,
                            message: result.data
                        });
                    }else{
                        this.setState({
                            message: result.data
                        })
                    }
                    
                }
            )
    }
    render(){
        const loggedin = this.state.loggedin;
        if (loggedin){
            return(
                <>
                {/*routes are used to display components depending on state of loggedin */}
                <Routes>
                    <Route path="/" element={<Dash token={this.state.token}/>} />
                </Routes>
                </>
            )
        }else{
            return(
                <>
                <Container fluid>
                    <Row>
                        <Header/>
                    </Row>
                    <Row >
                        <Alert variant='info'>{this.state.message}</Alert>
                        <Routes>
                            <Route path="/" element={<Login onEmail={this.handleEmail} onPassword={this.handlePassword} onLogin={this.handleLogin}/>} />
                            <Route path="/register" element={<Register/>} />
                        </Routes>
                    </Row>   
                    <p>{this.state.message}</p>
                </Container>
                </>
            )
        }
        
    }
}

export default Main