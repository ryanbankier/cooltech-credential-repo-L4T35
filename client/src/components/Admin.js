import React, { Component } from "react";

// import components
import UpdateUser from "./UpdateUser";

//import boostrap
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import Accordion from 'react-bootstrap/Accordion';

class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: '',
            isLoaded: false,
        }
        this.loadUsers = this.loadUsers.bind(this)
    }
    // gets user data id admin role is logged in token used to varify
    componentDidMount() {

        const token = this.props.token

        fetch('/getusers', {
            method: "POST",
            headers: {
                "authorization": `bearer ${token}`
            }
        })
            // parses response to JSON
            .then(response => response.json())
            // returns back message from server
            .then(
                (result) => {

                    this.setState({

                        isLoaded: true,
                        users: result.users

                    });
                }
            )
    }
    // event used to fresh table when a user is updated
    loadUsers(event) {
        event.preventDefault();
        const token = this.props.token

        fetch('/getusers', {
            method: "POST",
            headers: {
                "authorization": `bearer ${token}`
            }
        })
            // parses response to JSON
            .then(response => response.json())
            // returns back message from server
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        users: result.users
                    });
                }
            )
    }
    render() {
        // props recieved from Dash component
        const isLoaded = this.state.isLoaded;
        const role = this.props.role;
        if (isLoaded && role.a) {
            const users = this.state.users;
            return (
                <>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Admin</Accordion.Header>
                        <Accordion.Body>
                            <h3>Users</h3>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Organisation Unit</th>
                                        <th>Division</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(item => {
                                        if (item.role.n) {
                                            return (
                                                <tr>
                                                    <td>{item._id}</td>
                                                    <td>{item.name}</td>
                                                    <td>Normal</td>
                                                    <td>{item.ou}</td>
                                                    <td>{item.division}</td>
                                                </tr>
                                            )
                                        } else if (item.role.m) {
                                            return (
                                                <tr>
                                                    <td>{item._id}</td>
                                                    <td>{item.name}</td>
                                                    <td>Management</td>
                                                    <td>{item.ou}</td>
                                                    <td>{item.division}</td>
                                                </tr>
                                            )
                                        } else if (item.role.a) {
                                            return (
                                                <tr>
                                                    <td>{item._id}</td>
                                                    <td>{item.name}</td>
                                                    <td>Administor</td>
                                                    <td>All</td>
                                                    <td>All</td>
                                                </tr>
                                            )
                                        }
                                    })}
                                </tbody>
                            </Table>
                            <Button onClick={e => { this.loadUsers(e) }}>Refresh</Button>
                            {/*UpdateUser compenent contains the from used to update users */}
                            <UpdateUser users={users} role={role}/>
                        </Accordion.Body>
                    </Accordion.Item>
                </>
            )
        }
    }
}

export default Admin