
import React, { Component } from "react";

// import components


//import boostrap
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form'


class Update extends Component{
    constructor(props) {
        super (props)
        this.state ={
            _id: '',
            name : '',
            url : '',
            username : '',
            password: '',
            ou: '',
            division: '',
            response: ''
        }
        this.update = this.update.bind(this)
        this.input = this.input.bind(this)
    }
    // stores input into state based on name of from input
    input(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
           [name] : value
        });
    }

    // send data server to update repo data
    update(event){

        event.preventDefault();
        const btn = event.target.value
        const id = this.state._id
        let data = [];
    
        // a swith case is used to determine which data to send for updating on the server
        switch (btn) {
            case 'name':
                const name = this.state.name; 
                data = {_id: id, update: {name:name}};
                
                break;
            case 'url':
                const url = this.state.url;
                data = {_id: id, update:{url:url}};
                
                break;
            case 'username':
                const username = this.state.username;
                data = {_id: id, update:{username:username}};
                
                break;
            case 'password':
                const password = this.state.password
                data = {_id: id, update: {password:password}};
                
                break;
            case 'ou':
                const ou = this.state.ou
                data = {_id: id, update: {ou:ou}};
                
                break;
            case 'division':
                const division = this.state.division
                data = {_id: id, update: {division:division}};
                
                break;
        }
        
        // if statement is used to makesur there is data to send 
        if (data.length === 0){
            alert('no data');
        }else{
            fetch('/update', {
                method: "PUT",
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
    }
    render(){
        // props recieved from Dash component
        const role = this.props.role;
        const repo = this.props.repo;
        if (role.a || role.m){
        return(
            <>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Update</Accordion.Header>
                <Accordion.Body>
                    <Form>  
                        <p>{this.state.response}</p>
                        <h3>Update Repo</h3>

                            <Form.Group className="mb-3" >
                                <Form.Label>Select Job ID</Form.Label>
                                <Form.Select  name="_id" onChange={this.input} >
                                    <option>Select</option>
                                    {/*Map is used to pull are id's this used to specify which item to update */}
                                    {repo.map(item=>(
                                        <option value={item._id}>{item._id}</option>  
                                    ))}
                                </Form.Select>     
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name='name' onChange={this.input}/>
                                {/*button update based on field its grouped with */}
                                <Button type="submit" value='name' onClick={e =>{this.update(e); this.refresh()}}>Update</Button>
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Url</Form.Label>
                                <Form.Control type="text" name='url' onChange={this.input} />
                                {/*button update based on field its grouped with */}
                                <Button type="submit" value='url' onClick={e =>{this.update(e); this.refresh()}}>Update</Button>
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name='username' onChange={this.input} />
                                {/*button update based on field its grouped with */}
                                <Button type="submit" value='username' onClick={e =>{this.update(e); this.refresh()}}>Update</Button>
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="text" name='password' onChange={this.input} />
                                {/*button update based on field its grouped with */}
                                <Button type="submit" value='password' onClick={e =>{this.update(e); this.refresh()}}>Update</Button>
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
                                {/*button update based on field its grouped with */}
                                <Button type="submit" value='ou' onClick={e =>{this.update(e); this.refresh()}}>Update</Button>       
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
                                {/*button update based on field its grouped with */}
                                <Button type="submit" value='division' onClick={e =>{this.update(e); this.refresh()}}>Update</Button>
                            </Form.Group>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
            </>
        )
    }
    }
}

export default Update




