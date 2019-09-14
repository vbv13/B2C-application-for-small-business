import React, { Component } from 'react';
import UserLayout from '../../../hoc/user';

import FormField from '../../utils/Form/formfield';
import { update, generateData, isFormValid, populateOptionFields,resetFields} from '../../utils/Form/formActions';
import FileUpload from '../../utils/Form/fileupload';


import { connect } from 'react-redux';

class AddProduct extends Component {

    state = {
        formError:false,
        formSuccess:false,
        formdata:{
            name: {
                element: 'input',
                value: '',
                config:{
                    label: 'Nazwa produktu',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Wpisz swoje imię'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            description: {
                element: 'textarea',
                value: '',
                config:{
                    label: 'Opis produktu',
                    name: 'description_input',
                    type: 'text',
                    placeholder: 'Uzupełnij opis'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            price: {
                element: 'input',
                value: '',
                config:{
                    label: 'Cena produktu',
                    name: 'price_input',
                    type: 'number',
                    placeholder: 'Wpisz cenę'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            brand: {
                element: 'select',
                value: '',
                config:{
                    label: 'Marka produktu',
                    name: 'brands_input',
                    options:[]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            shipping: {
                element: 'select',
                value: '',
                config:{
                    label: 'Wysyłka',
                    name: 'shipping_input',
                    options:[
                        {key:true,value:'Yes'},
                        {key:false,value:'No'},
                    ]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            available: {
                element: 'select',
                value: '',
                config:{
                    label: 'Dostępne w zapasach',
                    name: 'available_input',
                    options:[
                        {key:true,value:'Yes'},
                        {key:false,value:'No'},
                    ]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            sort: {
                element: 'select',
                value: '',
                config:{
                    label: 'Sort',
                    name: 'sort_input',
                    options:[]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            size: {
                element: 'select',
                value: '',
                config:{
                    label: 'Rozmiar',
                    name: 'size_input',
                    options:[
                        {key:male,value:male},
                        {key:srednie,value:srednie},
                        {key:duze,value:duze},
                    ]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            publish: {
                element: 'select',
                value: '',
                config:{
                    label: 'Opublikuj',
                    name: 'publish_input',
                    options:[
                        {key:true,value:'Publiczne'},
                        {key:false,value:'Ukryte'},
                    ]
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            images:{
                value:[],
                validation:{
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: false
            }
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'products');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    componentDidMount(){
        const formdata = this.state.formdata;

        this.props.dispatch(getBrands()).then(response => {
            const newFormdata = populateOptionFields()

        })


    }

    imagesHandler = (images) => {
        const newFormdata = {
            ...this.state.formdata
        }

        newFormdata['images'].value = images
        newFormdata['images'].valid = true

        this.setState({
            formdata: newFormdata
        })
    }

    render() {
        return (
            <div>
                <h1>Dodaj produkty</h1>
                <FileUpload
                    imagesHandler={(images) => this.imagesHandler(images)}
                    reset={this.state.formSuccess}
                />
            </div>
        );
    }
}

export default AddProduct;