import React from 'react';
import UserLayout from '../../hoc/user';
import MyButton from '../utils/button';

const UserDashboard = () => {
    return (
        <UserLayout>
            <div>
                
                <div className='user_nfo_panel'>
                    <h1>Informacje o użytkowniku</h1>
                    <div>
                        <span>imie</span>
                        <span>nazwisko</span>
                        <span>emial</span>
                    </div>
                    <MyButton
                        type='default'
                        title='Edytuj'
                        linkTo='/user/user_profile'
                    />
                </div>

                <div className="user_nfo_panel">
                        <h1>Historia zakupów</h1>
                        <div className="user_product_block_wrapper">
                            history
                        </div>            
                </div>

            </div>


        </UserLayout>

    );
};

export default UserDashboard;