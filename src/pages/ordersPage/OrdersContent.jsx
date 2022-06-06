import React from 'react';
import OrderBlock from "./orderBlock/OrderBlock";

const OrdersContent = ({order, filterList}) => {

    return (
        <div>
            <h2 className='orderCountHeader'>Необходимо обработать: {filterList.length} </h2>
            {filterList.map(order =>
                <OrderBlock key={order.id} order={order}/>
            )}
        </div>
    );
};

export default OrdersContent;