import React, { Component } from 'react';
import Formfield from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions';

import Dialog from '@material-ui/core/Dialog';

import { connect } from 'react-redux';
import { registerUser } from '../../actions/user_actions';

class Register extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formdata:{
            name: {
                element: 'input',
                value: '',
                config:{
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Wpisz swoje imię'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            lastname: {
                element: 'input',
                value: '',
                config:{
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Wpisz swoje nazwisko'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            email: {
                element: 'input',
                value: '',
                config:{
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Wpisz swój email'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            password: {
                element: 'input',
                value: '',
                config:{
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Wpisz swoje hasło'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },       
            confirmPassword: {
                element: 'input',
                value: '',
                config:{
                    name: 'confirm_password_input',
                    type: 'password',
                    placeholder: 'Potwierdź swoje hasło'
                },
                validation:{
                    required: true,
                    confirm: 'password'
                },
                valid: false,
                touched: false,
                validationMessage:''
            }                  
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'register');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata, 'register');
        let formIsValid = isFormValid(this.state.formdata, 'register');

        if(formIsValid){
            this.props.dispatch(registerUser(dataToSubmit))
            .then(response =>{
                if(response.payload.success){
                    this.setState({
                        formError: false,
                        formSuccess: true
                    })
                    setTimeout(() => {
                        this.props.history.push('/register_login')
                    },3000)
                } else {
                    this.setState({formError: true})
                }
            }).catch(e => {
                this.setState({formError: true})
            })
        }else{
            this.setState({
                formError: true
            })
        }
        }

    render() {
        return (
            <div className='page_wrapper'>
                <div className='container'>
                    <div className='register_login_container'>
                        <div className='left'>
                            <form onSubmit={(event) => this.submitForm(event)}>
                            <h2>Informacje osobiste</h2>
                            <div className="form_block_two">
                                    <div className="block">
                                        <Formfield
                                            id={'name'}
                                            formdata={this.state.formdata.name}
                                            change={(element)=> this.updateForm(element)}
                                        />
                                    </div>
                                    <div className="block">
                                        <Formfield
                                            id={'lastname'}
                                            formdata={this.state.formdata.lastname}
                                            change={(element)=> this.updateForm(element)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Formfield
                                        id={'email'}
                                        formdata={this.state.formdata.email}
                                        change={(element)=> this.updateForm(element)}
                                    />
                                </div>
                                <h2>Ustaw hasło</h2>
                                <div className="form_block_two">
                                    <div className="block">
                                        <Formfield
                                            id={'password'}
                                            formdata={this.state.formdata.password}
                                            change={(element)=> this.updateForm(element)}
                                        />
                                    </div>
                                    <div className="block">
                                        <Formfield
                                            id={'confirmPassword'}
                                            formdata={this.state.formdata.confirmPassword}
                                            change={(element)=> this.updateForm(element)}
                                        />
                                    </div>
                                </div>   
                                <div>
                                    { this.state.formError ?
                                        <div className="error_label">
                                            Sprawdź swoje dane
                                        </div>
                                    :null}
                                    <button onClick={(event)=> this.submitForm(event)}>
                                        Stwórz konto
                                    </button>
                                </div>                                                             
                            </form>
                        </div>
                    </div>
                </div>

                <Dialog open={this.state.formSuccess}>
                    <div className="dialog_alert">
                        <div>Sukces</div>
                        <div>
                            Za moment zostaniesz przekierowany
                        </div>
                    </div>                    
                </Dialog>

            </div>
        );
    }
}

export default connect()(Register);
