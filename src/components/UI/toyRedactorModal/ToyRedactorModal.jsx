import React from 'react';
import classes from "../deliveryModal/Modal.module.css";
import ToyRedactorForm from "../toyRedactorForm/ToyRedactorForm";

const ToyRedactorModal = ({toy, toyInfo, supplier, location, visible, setVisible, isCreate}) => {

    const rootClasses = [classes.generalDiv];
    if (visible === true) {
        rootClasses.push(classes.active);
    }

    return (
        <div>
            <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
                <div className={classes.content} onClick={(e) => e.stopPropagation()}>
                    <ToyRedactorForm
                        toy={toy}
                        toyInfo={toyInfo}
                        supplier={supplier}
                        location={location}
                        setVisible={setVisible}
                        isCreate={isCreate}
                    />
                </div>
            </div>
        </div>
    );
};

export default ToyRedactorModal;