import React, {useEffect, useState} from 'react';
import classes from './SuppliersPage.module.css'
import {fetchSuppliers} from "../../http/supplierAPI";
import {setContentLoading} from "../../components/SetLoader";
import SuppliersContent from "./SuppliersContent";

const SuppliersPage = () => {

    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [supplierCreatorVisible, setSupplierCreatorVisible] = useState(false);
    const [filterList, setFilterList] = useState([]);

    useEffect(() => {
        fetchSuppliers().then(data =>{
            setSuppliers(data);
            setFilterList(data);
        }).finally(() =>{
            setLoading(false);
        })
    },[])

    return (
        <div className={classes.generalDiv}>
            {
                setContentLoading(
                    <SuppliersContent
                        suppliers={suppliers}
                        supplierCreatorVisible={supplierCreatorVisible}
                        setSupplierCreatorVisible={setSupplierCreatorVisible}
                        isCreate={true}
                        filterList={filterList}
                        setFilterList={setFilterList}
                    />,
                    suppliers.length,
                    loading)
            }
        </div>
    );
};

export default SuppliersPage;