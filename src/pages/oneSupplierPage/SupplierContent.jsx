import React from 'react';
import classes from "./SupplierPage.module.css";
import ToyBlock from "../../components/ToyBlock";
import DeliveryModal from "../../components/UI/deliveryModal/DeliveryModal";
import {useNavigate} from "react-router-dom";
import {deleteToy} from "../../http/toyAPI";
import {deleteSupplier} from "../../http/supplierAPI";
import SupplierRedactorModal from "../../components/UI/supplierRedactorModal/SupplierRedactorModal";

const SupplierContent = ({
                             supplierInfo,
                             suppliersToys,
                             deliveryFormVisible,
                             setDeliveryFormVisible,
                             supplierRedactorVisible,
                             setSupplierRedactorVisible
}) => {

    const email = 'mailto:' + supplierInfo.email;
    const navigate = useNavigate();

    function deleteSupplierButtonClick(){
        // eslint-disable-next-line no-restricted-globals
        const confirmDeleteToy = confirm("Подтвердите удаление поставщика." +
            "\n ВНИМАНИЕ! \n Будут удалены все товары поставщика!");

        try{
            if(confirmDeleteToy){
                suppliersToys.map(async toy =>
                    await deleteToy(toy.id)
                );
                deleteSupplier(supplierInfo.id).then(r =>
                    navigate('/suppliers')
                );
            }
        }catch (e) {
            alert(e.response.data.message);
        }
    }

    return (
        <div className={classes.generalInfo}>
            <div className={classes.divWithButtons}>
                <button onClick={() => setSupplierRedactorVisible(true)}>Редактировать информацию</button>
                <button onClick={deleteSupplierButtonClick}>Удалить</button>
            </div>
            <h1>Информация о продавце</h1>

            <div>
                <h2>{supplierInfo.name}</h2>
                Email: <a href={email}>{supplierInfo.email}</a><br/>
                Телефон: {supplierInfo.phone}
            </div>

            <hr/>
            <button className={classes.buttonForm} onClick={() => setDeliveryFormVisible(true)}>
                Оформить заказ на поставку
            </button>
            <h3>Все товары поставщика:</h3>
            {suppliersToys.map(toy =>
                <ToyBlock key={toy.id} toy={toy}/>
            )}
            <DeliveryModal
                supplier={supplierInfo}
                allToys={suppliersToys}
                visible={deliveryFormVisible}
                setVisible={setDeliveryFormVisible}
            />
            <SupplierRedactorModal
                supplier={supplierInfo}
                allToys={suppliersToys}
                visible={supplierRedactorVisible}
                setVisible={setSupplierRedactorVisible}
            />
        </div>
    );
};

export default SupplierContent;