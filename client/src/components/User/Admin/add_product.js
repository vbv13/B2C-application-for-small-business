import React, { Component } from 'react';
import UserLayout from '../../../hoc/user';

import FormField from '../../utils/Form/formfield';
import { update, generateData, isFormValid, populateOptionFields,resetFields} from '../../utils/Form/formActions';
import FileUpload from '../../utils/Form/fileupload';


import { connect } from 'react-redux';
import { getBrands, getSorts, addProduct, clearProduct } from '../../../actions/products_actions';

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
                element: 'textarea',
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
            sorts: {
                element: 'textarea',
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
                        {key:1,value:1},
                        {key:2,value:2},
                        {key:3,value:3},
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

    updateFields = (newFormdata) => {
        this.setState({
            formdata: newFormdata
        })
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'products')
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    resetFieldHandler = () => {
        const newFormdata = resetFields(this.state.formdata, 'products')

        this.setState({
            formdata: newFormdata,
            formSuccess: true
        })

        setTimeout(()=> {
            this.setState({
                formSuccess: false
            }, ()=>{
                this.props.dispatch(clearProduct())
            })
        }, 2666)
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'products')
        let validForm = isFormValid(this.state.formdata, 'products')

        if(validForm){
            this.props.dispatch(addProduct(dataToSubmit)).then(()=> {
                if(this.props.products.addProduct.success){
                    this.resetFieldHandler();
                } else {
                    this.setState({
                        formError: true
                    })
                }
            })
        } else {
            this.setState({
                formError: true
            })
        }
    }    

    componentDidMount(){
        const formdata = this.state.formdata;

        this.props.dispatch(getBrands()).then(response => {
            //console.log(this.props.products.brands) //zwraca undefined (zamiast arraya z json)
            const newFormdata = populateOptionFields(formdata, this.props.products.brands, 'brand')
            this.updateFields(newFormdata)
        })

        this.props.dispatch(getSorts()).then(response => {
            //console.log(this.props.products.sorts)    //zwraca pusty array zamiast zapełnionego arraya, objektami z pliku z folderu json
            const newFormdata = populateOptionFields(formdata, this.props.products.sorts, 'sorts')
            this.updateFields(newFormdata)
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
            <UserLayout>
            <div>
                <h1>Dodaj produkty</h1>

                <form onSubmit={(event)=>this.submitForm(event)}>
                        <FileUpload
                            imagesHandler={(images) => this.imagesHandler(images)}
                            reset={this.state.formSuccess}
                        />

                        <FormField
                            id={'name'}
                            formdata={this.state.formdata.name}
                            change={(element) => this.updateForm(element)}
                        />

                         <FormField
                            id={'description'}
                            formdata={this.state.formdata.description}
                            change={(element) => this.updateForm(element)}
                        />

                         <FormField
                            id={'price'}
                            formdata={this.state.formdata.price}
                            change={(element) => this.updateForm(element)}
                        />
                        <div className="form_devider"></div>

                        <FormField
                            id={'brand'}
                            formdata={this.state.formdata.brand}
                            change={(element) => this.updateForm(element)}
                        />

                        <FormField
                            id={'shipping'}
                            formdata={this.state.formdata.shipping}
                            change={(element) => this.updateForm(element)}
                        />

                        <FormField
                            id={'available'}
                            formdata={this.state.formdata.available}
                            change={(element) => this.updateForm(element)}
                        />

                        <FormField
                            id={'sorts'}
                            formdata={this.state.formdata.sorts}
                            change={(element) => this.updateForm(element)}
                        />

                        <FormField
                            id={'size'}
                            formdata={this.state.formdata.size}
                            change={(element) => this.updateForm(element)}
                        />

                        <div className="form_devider"></div>

                        <FormField
                            id={'publish'}
                            formdata={this.state.formdata.publish}
                            change={(element) => this.updateForm(element)}
                        />

                        <div className="form_devider"></div> 

                        {this.state.formSuccess ?
                            <div className='form_success'>
                                Udało się! Jest super
                            </div>
                        :null}

                        {this.state.formError ?
                            <div className='error_label'>
                                Spokojnie, sprawdź wprowadzone informacje 
                            </div>
                        :null}
                        <button onClick={(event) => this.submitForm(event)}>
                            Dodaj produkt
                        </button>

                </form>

            </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(AddProduct);