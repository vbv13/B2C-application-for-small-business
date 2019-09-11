import React from 'react';
import CardBlockShop from '../utils/card_block_shop';

const LoadmoreCards = () => {
    return (
        <div>
            <div>
                <CardBlockShop
                    grid={props.grid}
                    list={props.products}
                />
            </div>
            {
                props.size > 0 && props.size >= props.limit ?
                    <div>

                    </div>
                :null
            }
            
        </div>
    );
};

export default LoadmoreCards;