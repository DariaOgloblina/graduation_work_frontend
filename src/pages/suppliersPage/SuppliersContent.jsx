import React, {useState} from 'react';
import SupplierBlock from "../../components/SupplierBlock";
import SupplierRedactorModal from "../../components/UI/supplierRedactorModal/SupplierRedactorModal";
import classes from './SuppliersPage.module.css'
import {findByFilterName} from "../../components/Filter";

const SuppliersContent = ({
                              suppliers,
                              supplierCreatorVisible,
                              setSupplierCreatorVisible,
                              isCreate,
                              filterList,
                              setFilterList
}) => {
    const [filterSupplierName, setFilterSupplierName] = useState('');

    function changeFindSupplierName(value){
        setFilterSupplierName(value);
        if(value){
            findByFilterName(suppliers, value, setFilterList);
        }else{
            setFilterList(suppliers);
        }
    }

    return (
        <div>
            <h1>Все поставщики:</h1>
            <div className={classes.divWithCreateButton}>
                <button onClick={() => setSupplierCreatorVisible(true)}>Добавить нового</button>
                <input
                    type='text'
                    placeholder='Введите название'
                    value={filterSupplierName}
                    onChange={(e)=> {
                        changeFindSupplierName(e.target.value);
                    }}
                />
            </div>

            {filterList.length > 0
                ?filterList.map(supplier =>
                        <SupplierBlock key={supplier.id} supplier={supplier}/>)
                :<h1>Данные не найдены!</h1>
            }

            <SupplierRedactorModal
                visible={supplierCreatorVisible}
                setVisible={setSupplierCreatorVisible}
                isCreate={isCreate}
            />
        </div>
    );
};

export default SuppliersContent;