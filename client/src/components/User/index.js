import React from 'react';
import UserLayout from '../../hoc/user';
import MyButton from '../utils/button';

const UserDashboard = () => {
    return (
        <UserLayout>
            <div>
                
                <div className='user_nfo_panel'>
                    <h1>User information</h1>
                    <div>
                        <span>name</span>
                        <span>lastname</span>
                        <span>emial</span>
                    </div>
                    <MyButton
                        type='default'
                        title='Edit account info'
                        linkTo='/user/user_profile'
                    />
                </div>
            </div>
        </UserLayout>

    );
};

export default UserDashboard;