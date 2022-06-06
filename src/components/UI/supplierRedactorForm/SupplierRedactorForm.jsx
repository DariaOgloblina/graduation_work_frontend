import React, {useEffect, useState} from 'react';
import {createSupplier, updateSupplier} from "../../../http/supplierAPI";
import {useStateIfMounted} from "use-state-if-mounted";

const SupplierRedactorForm = ({supplier, setVisible, isCreate= false}) => {

    const [supplierName, setSupplierName] = useStateIfMounted('');
    const [supplierEmail, setSupplierEmail] = useStateIfMounted('');
    const [supplierPhone, setSupplierPhone] = useStateIfMounted('');
    const [nameForm, setNameForm] = useState('');

    useEffect(() => {
        if(!isCreate){
            setNameForm('редактирования');
            setSupplierName(String(supplier.name));
            setSupplierEmail(String(supplier.email));
            setSupplierPhone(String(supplier.phone));
        }else {
            setNameForm('создания');
        }
    }, [])



    async function redactorFormSubmit(event) {
        try {
            event.preventDefault();
            if(isCreate){
                await createSupplier(supplierName, supplierEmail, supplierPhone);
            }else{
                await updateSupplier(supplier.id, supplierName, supplierEmail, supplierPhone);
            }
            setVisible(false);
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        } catch (e) {
            alert(e.response.data.message);
        }
    }

    return (
        <div>
            <h3>Форма {nameForm} даннных поставщика</h3>
            <form onSubmit={redactorFormSubmit}>
                <p>Название</p>
                <input
                    type='text'
                    placeholder='Введите название организации'
                    value={supplierName}
                    required='required'
                    onChange={(e) => setSupplierName(e.target.value)}
                />
                <p>Email</p>
                <input
                    type='email'
                    placeholder='Введите Email'
                    value={supplierEmail}
                    required='required'
                    onChange={(e) => setSupplierEmail(e.target.value)}
                />
                <p>Телефон</p>
                <input
                    type='tel'
                    placeholder='Введите телефон'
                    value={supplierPhone}
                    required='required'
                    onChange={(e) => setSupplierPhone(e.target.value)}
                />
                <button type='submit'>Применить</button>
            </form>
        </div>
    );
};

export default SupplierRedactorForm;