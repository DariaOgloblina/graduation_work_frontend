import React from 'react';
import classes from './Modal.module.css'
import DeliveryForm from "../deliveryForm/DeliveryForm";

const DeliveryModal = ({supplier, allToys, visible, setVisible}) => {

    const rootClasses = [classes.generalDiv];
    if (visible === true) {
        rootClasses.push(classes.active);
    }
    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.content} onClick={(e) => e.stopPropagation()}>
                <DeliveryForm supplier={supplier} allToys={allToys} setVisible={setVisible}/>
            </div>
        </div>
    );
};

export default DeliveryModal;