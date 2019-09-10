import React, { Component } from 'react';
import PageTop from '../utils/page_top';

import { size, price } from '../utils/Form/fixed_categories'

import { connect } from 'react-redux';
import { getBrands, getSorts } from '../../actions/products_actions'

import CollapseCheckbox from '../utils/collapseCheckbox';
import CollapseRadio from '../utils/collapseRadio';

class Shop extends Component {

    state = {
        grid:'',
        limit:6,
        skip:0,
        filters:{
            brand:[],
            size:[],
            sort:[],
            price:[]
        }
    }

    componentDidMount(){
        this.props.dispatch(getBrands())
        this.props.dispatch(getSorts())

        this.props.dispatch(getProductsToShop(
            this.state.skip,
            this.state.limit,
            this.state.filters
        ))
    }

    handlePrice = (value) => {
        const data = price
        let array = []

        for(let key in data){
            if(data[key]._id === parseInt(value,10)){
                array = data[key].array
            }
            return array
        }
        
    }

    handleFilters = (filters, category) => {
        const newFilters = {...this.state.filters}
        newFilters[category] = filters;

        if(category === 'price'){
            let priceValues = this.handlePrice(filters);
            newFilters[category] = priceValues
        }

        this.setState({
            filters: newFilters
        })
    }

    render() {
        console.log(this.state.filters)
        const products = this.props.products
        return (
            <div>
                <PageTop
                    title='Przeglądaj produkty'
                />
                <div className='container'>
                    <div className='shop_wrapper'>
                        <div className='left'>
                        <CollapseRadio
                            initState={false}
                            title="Cena"
                            list={price}
                            handleFilters={(filters) => this.handleFilters(filters, 'price')}
                        />     
                        <CollapseCheckbox
                            initState={false}
                            title="Rozmiar"
                            list={size}
                            handleFilters={(filters) => this.handleFilters(filters, 'size')}
                        />                                                  
                        <CollapseCheckbox
                            initState={true}
                            title="Marka"
                            list={products.brands}
                            handleFilters={(filters) => this.handleFilters(filters, 'brand')}
                        />
                        <CollapseCheckbox
                            initState={false}
                            title="Rodzaj"
                            list={products.sort}
                            handleFilters={(filters) => this.handleFilters(filters, 'sort')}
                        />                                                                     
                        </div>
                        <div className='right'>
                            right
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Shop);