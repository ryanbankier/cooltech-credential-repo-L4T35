import React, { Component } from "react";


//import boostrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert'


class Add extends Component{
    constructor(props) {
        super (props)
        this.state ={
            name : '',
            url : '',
            username : '',
            password: '',
            ou: '',
            division: '',
            response: ''
        }
        this.input = this.input.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSubmit2 = this.handleSubmit2.bind(this)
        
    }
    // sets state based on name of form input and onchange event
    input(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name] : value
        });
    }
    // sends data to create repo based on stored state.
    handleSubmit(event){
        event.preventDefault();
        const data = this.state;

    fetch('/createRepo', {
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
                    response: result.data
                });
            }
        )
    }
    // sends data to create repo based on stored state.
    handleSubmit2(event){
        event.preventDefault();

        const name = this.state.name;
        const url = this.state.url;
        const username = this.state.username;
        const password = this.state.password;
        const ou = this.props.ou;
        const division = this.props.division;
        
        const data = {name:name, url:url, username:username, password:password, ou:ou, division:division}

    fetch('/createRepo', {
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
                    response: result.data
                });
            }
        )
    }
    
    render(){
        {/* Props received from Dash component*/}
        const ou = this.props.ou;
        const division = this.props.division;
        const role = this.props.role;
        {/* if state determins which render to return based on user role */}
        if(role.a){
            return(
                <>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Add</Accordion.Header>
                        <Accordion.Body>
                            <h3>Create Repo</h3>
                            <Alert variant='info'>{this.state.response}</Alert>
                            <Form>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name='name' onChange={this.input}/>
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Url</Form.Label>
                                    <Form.Control type="text" name='url' onChange={this.input} />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" name='username' onChange={this.input} />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>password</Form.Label>
                                    <Form.Control type="text" name='password' onChange={this.input} />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Organisation Unit</Form.Label>
                                        <Form.Select  name="ou" onChange={this.input} >
                                            <option>Select</option>
                                            <option value='news'>News Management</option>
                                            <option value='software'>Software Reviews</option>
                                            <option value='hardware'>Hardware Reviews</option>
                                            <option value='opinion'>Opinion publishing</option>
                                        </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Division</Form.Label>
                                            <Form.Select  name="division" onChange={this.input} >
                                                <option>Select</option>
                                                <option value='finance'>Finance</option>
                                                <option value='it'>IT</option>
                                                <option value='writing'>Writing</option>
                                                <option value='hr'>HR</option>
                                                <option value='dev'>Development</option>
                                                <option value='sales'>Sales</option>
                                            </Form.Select>
                                </Form.Group>
                                <Button type="submit" onClick={e =>{this.handleSubmit(e);}}>Add</Button>
                            </Form> 
                        </Accordion.Body>
                </Accordion.Item>
                </>
            )

        }
        else{  
            return(
                <>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Add</Accordion.Header>
                        <Accordion.Body>
                            <h3>Create Repo</h3>
                            <Form>
                                <Alert variant='info'>{this.state.response}</Alert>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name='name' onChange={this.input}/>
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Url</Form.Label>
                                    <Form.Control type="text" name='url' onChange={this.input} />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" name='username' onChange={this.input} />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>password</Form.Label>
                                    <Form.Control type="text" name='password' onChange={this.input} />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Organisation Unit</Form.Label>
                                    <Form.Control type="text" name='ou'  placeholder={ou} value={ou} ref={this.preInput} disabled/>
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Division</Form.Label>
                                    <Form.Control type="text" name='division'  placeholder={division} value={division} ref={this.preInput} disabled/>
                                </Form.Group>
                                <Button type="submit" onClick={e =>{this.handleSubmit2(e);}}>Add</Button>
                            </Form> 
                        </Accordion.Body>
                </Accordion.Item>
                </>
            )
    }
    }
}

export default Add