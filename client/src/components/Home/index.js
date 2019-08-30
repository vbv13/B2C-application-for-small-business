import React, { Component } from 'react';
import HomeSlider from './home_slider';
import HomePromotion from './home_promotions';

import {connect} from 'react-redux';
import {getProductsBySell, getProdutsByArrival} from '../../actions/products_actions';
import CardBlock from '../utils/card_blocks';


class Home extends Component {

    componentDidMount() {
        this.props.dispatch(getProductsBySell())
        this.props.dispatch(getProdutsByArrival())
    }

    render() {
        return (
            <div>
                <HomeSlider/>
                <CardBlock
                    list={this.props.products.bySell}
                    title='Najlepiej sprzedające się produkty'
                />
                <HomePromotion/>
                <CardBlock
                    list={this.props.products.byArrival}
                    title='Świeża dostawa, nowości'
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
  };

export default connect(mapStateToProps)(Home);