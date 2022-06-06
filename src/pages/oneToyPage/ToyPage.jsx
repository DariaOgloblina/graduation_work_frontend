import React, {useEffect, useState} from 'react';
import {fetchOneToy, fetchSupplier, fetchToyInfo} from "../../http/toyAPI";
import {observer} from "mobx-react-lite";
import {fetchToyLocation} from "../../http/warehouseAPI";
import {setContentLoading} from "../../components/SetLoader";
import ToyContent from "./ToyContent";

const ToyPage = observer(() => {

    const id = window.location.pathname.toString().split('/')[2];
    const [loading, setLoading] = useState(true);

    const [toyMainInfo, setToyMainInfo] = useState({});
    const [toyInfo, setToyInfo] = useState({});
    const [location, setLocation] = useState({});
    const [supplier, setSupplier] = useState({});
    const [toyRedactorVisible, setToyRedactorVisible] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        await fetchOneToy(id).then(data => {
            const newObject = {
                id: data.id,
                name: data.name,
                img: data.img,
                price: data.price
            };
            setToyMainInfo(newObject);
        });

        await fetchToyInfo(id).then(data => {
            const newObject = {
                description: data.description,
                height: data.height,
                weight: data.weight,
                material: data.material
            };
            setToyInfo(newObject);
        });

        try{
            setLocation(await fetchToyLocation(id));

        }catch (e){
            setLocation(false);
        }

        await fetchSupplier(id).then(supplier =>
            setSupplier(supplier)
        );
        setLoading(false);
    },[]);

    return (
        <div>
            {
                setContentLoading(
                    <ToyContent
                        toyMainInfo={toyMainInfo}
                        toyInfo={toyInfo}
                        supplier={supplier}
                        location={location}
                        toyRedactorVisible={toyRedactorVisible}
                        setToyRedactorVisible={setToyRedactorVisible}
                    />,
                    toyInfo.length,
                    loading
                )
            }
        </div>

    );
});

export default ToyPage;