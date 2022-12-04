import React, { Component } from "react";

// import components
import Header from './Header'
import Add from './Add'
import Update from './Update'
import Admin from './Admin'

//import boostrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import Accordion from 'react-bootstrap/Accordion';


class Dash extends Component{
    constructor(props) {
        super (props)
        this.state = {
            token: this.props.token,
            repo: '',
            isLoaded: false,
            role: '',
            ou: '',
            division: '',
            adminUrl: ''
        }

    }
    componentDidMount(){
        fetch('/getrepo', {
            method: "POST",
            headers: {
            "authorization": `bearer ${this.state.token}`
            }
            
            })
            // parses response to JSON
            .then(response => response.json()) 
            // returns back message from server
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        repo: result.repo,
                        role: result.role,
                        ou: result.ou,
                        division: result.division,
                        url: result.url
                    });
                }
            ) 
    }
    render(){
        const isLoaded = this.state.isLoaded

        if (isLoaded){
            const repo = this.state.repo;
            const url = this.state.url;
        return(
            <>
            <Container fluid>
                <Row>
                    <Header url={url}/>
                </Row>
                <Row >
                    <h3>Credential Repository</h3>
                    <Table striped bordered hover>
                    <thead>
                            <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Url</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Organisation Unit</th>
                            <th>Division</th>
                            </tr>
                        </thead>
                        <tbody>
                            {repo.map(item=>(
                                <tr>
                                    <td>{item._id}</td>
                                  <td>{item.name}</td>
                                  <td><a href={item.url} target="_blank">{item.url}</a></td> 
                                  <td>{item.username}</td>
                                  <td>{item.password}</td>
                                  <td>{item.ou}</td>
                                  <td>{item.division}</td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button onClick= {e =>{this.componentDidMount(e)}}>Refresh</Button>
                </Row>
                <Row>
                <Accordion>
                    
                    <Add ou={this.state.ou} division={this.state.division} role={this.state.role}/>
                    <Update role={this.state.role} repo={this.state.repo}/>
                    <Admin token={this.state.token} role={this.state.role}/>
                       
                </Accordion>
                </Row>
            </Container>
            </>
            )
        }
    }
}


export default Dash