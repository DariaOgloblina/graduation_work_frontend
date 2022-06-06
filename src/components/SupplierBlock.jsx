import React, {useEffect} from 'react';
import classes from '../pages/suppliersPage/SuppliersPage.module.css';
import {fetchAllProducts} from "../http/supplierAPI";
import {useNavigate} from "react-router-dom";
import {useStateIfMounted} from "use-state-if-mounted";

const SupplierBlock = ({supplier}) => {

    const navigate = useNavigate();
    const [toyCount, setToyCount] = useStateIfMounted(0);

    useEffect(() => {
        try {
            fetchAllProducts(supplier.id).then(data =>
                setToyCount(data.length)
            );
        }catch (e) {
            alert(e.response.data.message);
        }
    },[])

    return (
        <div className={classes.supplierBlockBorder} onClick={() => navigate('/suppliers/' + supplier.id)}>
            <div className={classes.supplierBlock}>
                <div className={classes.supplierInfo}>
                    {supplier.name}
                </div >
                <div className={classes.supplierInfo}>
                    {supplier.email}
                </div>
                <div className={classes.supplierInfo}>
                    {supplier.phone}
                </div>
                <div className={classes.supplierInfo}>
                    Количество поставляемых товаров: {toyCount}
                </div>
            </div>
        </div>
    );
};

export default SupplierBlock;