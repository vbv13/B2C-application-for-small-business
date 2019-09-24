import React from 'react';
import moment from 'moment';

const UserHistoryBlock = (props) => {


    const renderBlocks = () => (
        props.products ?
            props.products.map((product,i)=>(
                <tr key={i}>
                    <td>{moment(product.dateOfPurchase).format("MM.DD.YYYY")}</td>
                    <td>{product.brand} {product.name}</td>
                    <td>{product.price} PLN</td>
                    <td>{product.quantity}</td>
                </tr>
            ))
        :null
    )

    return (
        <div className="history_blocks">
            <table>
                <thead>
                    <tr>
                        <th>Data zakupu</th>
                        <th>Produkt</th>
                        <th>Zapłacono</th>
                        <th>Ilość</th>
                    </tr>
                </thead>
                <tbody>
                    {renderBlocks()}
                </tbody>
            </table>
        </div>
    );
};

export default UserHistoryBlock;