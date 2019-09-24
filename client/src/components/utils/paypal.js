import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
    
    render() {

        const onSuccess = (payment) =>{ 
            //console.log(JSON.stringify(payment));
            this.props.onSuccess(payment);

        }

        const onCancel = (data) =>{
            console.log(JSON.stringify(data))
        }

        const onError = (err) => {
            console.log(JSON.stringify(err))
        }

        let env = 'sandbox';
        let currency = 'PLN';
        let total = this.props.toPay;
        
        const client = {
            sandbox:'Ae-Kobk06bgETp52DepfOXt0UfTRju7d_e_dR4Q4hNlirw5DVu_o1b-ahAwjQJs3pOpEcaQxdAp10Atx',
            production:''
        }        

        
        return (
            <div>
                <PaypalExpressBtn
                    env={env}
                    client={client}
                    currency={currency}
                    total={total}
                    onError={onError}
                    onSuccess={onSuccess}
                    onCancel={onCancel}
                    style={{
                        size:'large',
                        color: 'blue',
                        shape: 'rect',
                        label: 'checkout'
                    }}
                
                />                
            </div>
        );
    }
}

export default Paypal;