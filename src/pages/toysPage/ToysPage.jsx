import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {fetchToys} from "../../http/toyAPI";
import {observer} from "mobx-react-lite";
import classes from "./ToysPage.module.css"
import ToysContent from "./ToysContent";
import {setContentLoading} from "../../components/SetLoader";
import {fetchSuppliers} from "../../http/supplierAPI";
import {useStateIfMounted} from "use-state-if-mounted";

const ToysPage = observer(() => {
    const {toy} = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [list, setList] = useStateIfMounted([]);
    const [filterList, setFilterList] = useStateIfMounted([]);
    const [suppliers, setSuppliers] = useState([]);
    const [toyCreatorVisible, setToyCreatorVisible] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        await fetchToys(null, 1, 10, false).then(data => {
            toy.setToys(data.rows);
            toy.setTotalCount(data.count);
            setList(data.rows);
            setFilterList(data.rows);
        })
        await fetchSuppliers().then(data =>
            setSuppliers(data)
        );
        setLoading(false);
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        await fetchToys(toy.selectedSupplier, toy.page, toy.limit).then(data => {
            toy.setToys(data.rows);
            toy.setTotalCount(data.count);
            setList(data.rows);
            setFilterList(data.rows);
        })
    }, [toy.page, toy.selectedSupplier]);

    return (
        <div className={classes.allToys}>
            {
                setContentLoading(<ToysContent
                    toy={toy}
                    suppliers={suppliers}
                    list={list}
                    filterList={filterList}
                    setFilterList={setFilterList}
                    toyCreatorVisible={toyCreatorVisible}
                    setToyCreatorVisible={setToyCreatorVisible}
                    isCreate={true}
                />, toy.totalCount, loading)
            }
        </div>
    );
});

export default ToysPage;