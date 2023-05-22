import React from 'react';
import './Error.css';

const Component = () => {
    const handleMouseMove = (event) => {
        const torch = document.querySelector('.torch');
        torch.style.top = event.pageY + 'px';
        torch.style.left = event.pageX + 'px';
    };

    return (
        <div className="component" onMouseMove={handleMouseMove}>
            <div className="text">
                <h1>404</h1>
                <h2>Uh, Ohh</h2>
                <h3>
                    Sorry, we can't find what you are looking for 'cause it's so dark in
                    here
                </h3>
            </div>
            <div className="torch"></div>
        </div>
    );
};

export default Component;
