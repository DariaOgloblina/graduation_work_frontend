import React from 'react';
import classes from "../deliveryModal/Modal.module.css";
import SupplierRedactorForm from "../supplierRedactorForm/SupplierRedactorForm";

const SupplierRedactorModal = ({supplier, allToys, visible, setVisible, isCreate}) => {
    const rootClasses = [classes.generalDiv];
    if (visible === true) {
        rootClasses.push(classes.active);
    }
    return (
        <div>
            <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
                <div className={classes.content} onClick={(e) => e.stopPropagation()}>
                    <SupplierRedactorForm supplier={supplier} allToys={allToys} setVisible={setVisible} isCreate={isCreate}/>
                </div>
            </div>
        </div>
    );
};

export default SupplierRedactorModal;