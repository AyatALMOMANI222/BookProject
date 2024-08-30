import React from "react";
import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import CreateBook2 from "../../components/create"
import Books from "../books";
import CustomSidebar from "../../components/SideBar";
import HomePage from "../home";
const Adminn = () => {
  return (

      <Admin dataProvider={simpleRestProvider('http://localhost:8000/api')}
      sidebar={CustomSidebar}
      >
        <Resource
          name="books" // تأكد من أن هذا الاسم يتطابق مع الموارد في API الخاص بك
          list={Books}
          create={CreateBook2} // تأكد من أن CreateBook متاح ويعمل بشكل صحيح
        />
 
      </Admin>

  );
};

export default Adminn;
