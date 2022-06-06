import React, {useEffect, useState} from 'react';
import {fetchAllProducts, fetchOneSupplier} from "../../http/supplierAPI";
import {setContentLoading} from "../../components/SetLoader";
import SupplierContent from "./SupplierContent";

const SupplierPage = () => {

    const id = window.location.pathname.toString().split('/')[2];
    const [supplierInfo, setSupplierInfo] = useState({});
    const [suppliersToys, setSuppliersToys] = useState([]);
    const [deliveryFormVisible, setDeliveryFormVisible] = useState(false);
    const [supplierRedactorVisible, setSupplierRedactorVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        await fetchOneSupplier(id).then(data =>
            setSupplierInfo(data)
        );

        await fetchAllProducts(id).then(data =>
            setSuppliersToys(data)
        );
        setLoading(false);
    }, [])

    return (
        <div>
            {setContentLoading(
                <SupplierContent
                    supplierInfo={supplierInfo}
                    suppliersToys={suppliersToys}
                    deliveryFormVisible={deliveryFormVisible}
                    setDeliveryFormVisible={setDeliveryFormVisible}
                    supplierRedactorVisible = {supplierRedactorVisible}
                    setSupplierRedactorVisible = {setSupplierRedactorVisible}
                />,
                supplierInfo.length,
                loading)}
        </div>
    );
};

export default SupplierPage;