import React from 'react';
import Card from '../utils/card';

const CardBlockShop = (props) => {

    const renderCards = () => (
        props.list ? 
            Array.from(props.list).map(card=>(
                    <Card
                        key={card._id}
                        {...card}
                        grid={props.grid}
                    />
                ))
        :null
    )

    return (
        <div className="card_block_shop">
            <div>
                <div>
                    {props.list ?
                        props.list.length === 0 ?
                            <div className="no_result">
                                Brak dopasowań
                            </div>
                        :null
                    :null}
                    { renderCards(props.list)}
                </div>

            </div>
        </div>
    );
};

export default CardBlockShop;