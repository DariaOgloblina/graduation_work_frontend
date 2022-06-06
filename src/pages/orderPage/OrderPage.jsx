import React, {useEffect, useState} from 'react';
import {fetchOneOrder, fetchOrderInfo, fetchOrderStructure, updateOrderStatus} from "../../http/orderAPI";
import {fetchOneToy} from "../../http/toyAPI";
import {observer} from "mobx-react-lite";
import {setContentLoading} from "../../components/SetLoader";
import OrderContent from "./OrderContent";

const OrderPage = observer(() => {

    const id = window.location.pathname.toString().split('/')[2];

    const [orderInfos, setOrderInfo] = useState({});
    const [mainInfos, setMainInfo] = useState({});
    const [toyInfos, setToyInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOneOrder(id).then(data => {
            setOrderInfo(data);
        });

        fetchOrderInfo(id).then(data => {
            setMainInfo(data);
        });

        let newObject;
        fetchOrderStructure(id).then(data => {
            data.map(data =>
                getToyById(data.toyId).then(dataToy => {
                     newObject = {
                        id: dataToy.id,
                        name: dataToy.name,
                        img: dataToy.img,
                        price: dataToy.price,
                        count: data.count
                    };
                     setToyInfo((prevState) => ([...prevState, newObject]));
                }),
            );
        });

        setLoading(false);
    }, []);

    async function getToyById(toyId) {
        return await fetchOneToy(toyId);
    }

    return (
        <div>
            {
                setContentLoading(
                    <OrderContent orderInfos={orderInfos} mainInfos={mainInfos} toyInfos={toyInfos}/>,
                    mainInfos.length,
                    loading
                )
            }
        </div>
    );
});

export default OrderPage;