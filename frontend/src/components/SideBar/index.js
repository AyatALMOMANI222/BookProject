import React from 'react';
import { Sidebar, MenuItemLink } from 'react-admin';
import { Dashboard, Book, Info, Settings } from '@mui/icons-material'; // استيراد الأيقونات

const CustomSidebar = (props) => {
    return (
        <Sidebar {...props}>
            <MenuItemLink
                to="/"
                primaryText="Dashboard"
                leftIcon={<Dashboard />}
            />
            <MenuItemLink
                to="/books"
                primaryText="Books"
                leftIcon={<Book />}
            />
            {/* العناصر الجديدة تحت "Books" */}
            <MenuItemLink
                to="/createbook"
                primaryText="Add New Book"
                // leftIcon={<Info />}
            />
            {/* <MenuItemLink
                to="/books/settings"
                primaryText="Book Settings"
                leftIcon={<Settings />}
            /> */}
        </Sidebar>
    );
};

export default CustomSidebar;
