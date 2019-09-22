import React from 'react';
import UserLayout from '../../../hoc/user';
import ManageBrands from './manage_brands';
import ManageSorts from './manage_sorts';

const ManageCategories = () => {
    return (
        <UserLayout>
            <ManageBrands/>
            <ManageSorts/>
        </UserLayout>
    );
};

export default ManageCategories;