import React from 'react';
import MyButton from '../utils/button';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

const ProdNfo = (props) => {

    const showProdTags = (detail) => (
        <div className="product_tags">
            { detail.shipping ?
                <div className="tag">
                    <div><FontAwesomeIcon icon={faTruck}/></div>
                    <div className="tag_text">
                        <div>Darmowa dostawa</div>
                        <div>i zwrot</div>
                    </div>
                </div>
            :null
            }
            { detail.available ?
                <div className="tag">
                    <div><FontAwesomeIcon icon={faCheck}/></div>
                    <div className="tag_text">
                        <div>Dostępne</div>
                        <div>w sklepie</div>
                    </div>
                </div>
            :
                <div className="tag">
                    <div><FontAwesomeIcon icon={faTimes}/></div>
                    <div className="tag_text">
                        <div>Niedostępne</div>
                        <div>Możliwa jedynie przedsprzedaż</div>
                    </div>
                </div>
            }
        </div>
    )

    const showProdActions = (detail) => (
        <div className="product_actions">
            <div className="price">{ detail.price } PLN</div>
            <div className="cart">
                <MyButton
                    type="add_to_cart_link"
                    runAction={()=>{
                       props.addToCart(detail._id)
                    }}
                />
            </div>
        </div>
    )

    const showProdSpecifications = (detail) => (
        <div className="product_specifications">
            <h2>Cechy:</h2>
            <div>
                <div className="item">
                    <strong>Rozmiar:</strong> {detail.size}
                </div>
                <div className="item">
                    <strong>Rodzaj:</strong> {detail.sort.name}
                </div>
            </div>
        </div>
    )


    const detail = props.detail;
    return (
        <div>
            <h1>{detail.brand.name} {detail.name}</h1>
            { showProdActions(detail)}
            <p>
                {detail.description}
            </p>            
            { showProdTags(detail)}
            { showProdSpecifications(detail)}
        </div>
    );
};

export default ProdNfo;