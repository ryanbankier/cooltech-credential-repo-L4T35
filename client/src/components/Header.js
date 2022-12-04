import React from "react";

//import boostrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';



function Header(props){
    // onclick event used to run logout and redirect
    function logout(){
       
        fetch("/logout", {
            credentials: 'include',
            method: "GET",
            }).then(function(response) {
                if (response.redirected) {
                  return window.location.replace(response.url);
                }
            })
 
    }

    const url = props.url;
    if (url == '/useradmin'){
        return(
            <header className='header-container'>
            <Container fluid>
                <h1>CoolTech Credential Manager</h1>
                <Nav >
                    <Nav.Item>
                        <Nav.Link className="nav" onClick={logout}>Logout</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </header>
        )
    }else if (url == '/user') {
        return(
            <header className='header-container'>
                <Container fluid>
                    <h1>CoolTech  Credential Manager</h1>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link className="nav" onClick={logout}>Logout</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </header>
        )
}else{
    return(
    <header className='header-container'>
            <Container fluid>
                <h1>CoolTech  Credential Manager</h1>
                
            </Container>
        </header>
        )
}
}

export default Header