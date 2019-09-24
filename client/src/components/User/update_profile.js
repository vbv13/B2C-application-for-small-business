import React from 'react';
import UserLayout from '../../hoc/user';
import UpdatePersonalNfo from './update_personal_nfo';

const UpdateProfile = () => {
    return (
        <UserLayout>
            <h1>Profil</h1>
            <UpdatePersonalNfo/>
        </UserLayout>
    );
};

export default UpdateProfile;