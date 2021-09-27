import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Navbar from './Navbar';

function Example() {
    return (
        <div className="container">
            <Navbar />
            <Home />
        </div>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
