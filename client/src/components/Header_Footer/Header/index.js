import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header className="bck_b_light">
                <div className="container">
                    <div className="left">
                        <div className="logo">
                            firma xyz
                        </div>
                    </div>
                    <div className="right">
                        <div className="top">
                            LINK1
                        </div>
                        <div className="bottom">
                            LINK2
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;