import React from "react";
import { Create, SimpleForm, TextInput, NumberInput, FileInput, FileField, useNotify } from 'react-admin';
import { useRedirect } from 'react-admin';
import axios from 'axios';

const CreateBook2 = (props) => {
    const redirect = useRedirect();
    const notify = useNotify();  // لإظهار رسائل التنبيه

    const handleSave = async (values) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("price", values.price);
        
        if (values.image && values.image.rawFile) {
            formData.append("image", values.image.rawFile); // الوصول إلى الملف الفعلي
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post("http://127.0.0.1:8000/api/book", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            notify('Book created successfully'); // رسالة نجاح
            redirect('list', 'books'); // إعادة التوجيه بعد نجاح الإنشاء
        } catch (error) {
            notify('Error creating book'); // رسالة خطأ
            console.error("There was an error creating the book!", error);
        }
    };

    return (
        <Create {...props}>
            <SimpleForm save={handleSave}>
                <TextInput source="title" label="Book Title" />
                <TextInput source="description" label="Description" />
                <NumberInput source="price" label="Price" />
                <FileInput source="image" label="Select an Image" accept="image/*">
                    <FileField source="src" title="title" />
                </FileInput>
            </SimpleForm>
        </Create>
    );
};

export default CreateBook2;
