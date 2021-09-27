import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { divide } from 'lodash';

class Navbar extends Component {

    render() {
        return(
            <div className="NavbarItems">
                <Nav>
                    <NavItem>
                    <NavLink href="#">Home</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink href="#">Dashboard</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink href="#">Profile</NavLink>
                    </NavItem>
                </Nav>
                <hr />
            </div>
        )
    }

}

export default Navbar;

if(document.getElementById('navbar')) {
    ReactDOM.render(<Navbar/>, document.getElementById('navbar'));
}