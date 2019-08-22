import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/user_actions';


class Header extends Component {

    state = {
        page: [
            {
                name: 'Strona Główna',
                linkTo: '/',
                public: true
            },
            {
                name: 'Przedmioty',
                linkTo: '/shop',
                public: true
            }
        ],
        user:[
            {
                name: 'Koszyk',
                linkTo:'/user/cart',
                public: false
            },
            {
                name: 'Moje konto',
                linkTo:'/user/dashboard',
                public: false
            },
            {
                name: 'Zaloguj się',
                linkTo:'/register_login',
                public: true
            },
            {
                name: 'Wyloguj się',
                linkTo:'/user/logout',
                public: false
            }
        ]
    }

    logoutHandler = () => {
        this.props.dispatch(logoutUser()).then(response =>{
            if(response.payload.success){
                this.props.history.push('/')
            }
        })
    }

    cartLink = (item, i) => {
        const user = this.props.user.userData;

        return (
            <div className='cart_link' key={i}>
                <span>{user.cart ? user.cart.length : 0}</span>
                <Link to={item.linkTo}>
                    {item.name}
                </Link>
            </div>
        )
    }

    defaultLink = (item, i) => (
        item.name === 'Wyloguj się' ? 
            <div className='log_out_link'
                key={i}
                onClick={() => this.logoutHandler()}
            >
                {item.name}
            </div>
            :
            <Link to={item.linkTo} key={i}>
                {item.name}
            </Link>
    )

    showLinks = (type) => {
        let list = [];

        if(this.props.user.userData){

            type.forEach((item) => {
                if(!this.props.user.userData.isAuth){
                    if(item.public === true){
                        list.push(item)
                    }
                } else{
                    if(item.name !== 'Log in'){
                        list.push(item)
                    }
                }
            });
        }

        return list.map((item, i) => {
            if(item.name !== 'Koszyk'){
                return this.defaultLink(item, i)
            } else {
                return this.cartLink(item, i)
            }
        })

    }

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
                            {this.showLinks(this.state.user)}
                        </div>
                        <div className="bottom">
                            {this.showLinks(this.state.page)}
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(Header));