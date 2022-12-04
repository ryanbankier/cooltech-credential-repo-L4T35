
import React, { Component } from "react";


//import boostrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class UpdateUser extends Component{
    constructor(props) {
        super (props)
        this.state ={
            _id: '',
            name : '',
            role: '',
            ou: '',
            division: '',
            response: ''
        }
        this.update = this.update.bind(this)
        this.input = this.input.bind(this)
    }
    input(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
           [name] : value
        });
    }
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
            case 'role':
                const role = this.state.role;
                if (role == 'n'){
                    data = {_id: id, update:{role:{n:true, m:false, a:false}}};
                }else if (role == 'm'){
                    data = {_id: id, update:{role:{m:true, n:false, a: false}}};
                }else if (role == 'a'){
                    data = {_id: id, update:{role:{a:true, n:false, m: false}}};
                }
                break;
            case 'ou':
                const ou = this.state.ou
                data = {_id: id, update: {ou:ou}};
                
                break;
            case 'divison':
                const division = this.state.division
                data = {_id: id, update: {division:division}};
                
                break;
        }

        // if statement is used to makesur there is data to send 
        if (data.length === 0){
            alert('no data');
        }else{
            fetch('/updateuser', {
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
        
        // props received from dash component
        const role = this.props.role;
        const users = this.props.users;
        if (role.a || role.m){
            return( 
                <Form>  
                    <p>{this.state.response}</p>
                    <h3>Update User</h3>
                            <Form.Group className="mb-3" >
                                <Form.Label>Select User ID</Form.Label>
                                <Form.Select  name="_id" onChange={this.input} >
                                <option>Select</option>
                                {/*Map is used to pull are id's this used to specify which item to update */}
                                {users.map(item=>(
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
                                <Form.Label>Role</Form.Label>
                                <Form.Select  name="role" onChange={this.input} >
                                    <option>Select</option>
                                    <option value='n'>Normal</option>
                                    <option value='m'>Management</option>
                                    <option value='a'>Administrator</option>
                                    
                                </Form.Select>
                                {/*button update based on field its grouped with */}
                                <Button type="submit" value='role' onClick={e =>{this.update(e); this.refresh()}}>Update</Button>
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
                                <Button type="submit" value='role' onClick={e =>{this.update(e); this.refresh()}}>Update</Button>
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

            )
        }
    }
}

export default UpdateUser