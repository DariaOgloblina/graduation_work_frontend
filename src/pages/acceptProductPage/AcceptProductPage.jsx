import React, {useEffect, useState} from 'react';
import {fetchAllProducts, fetchSuppliers} from "../../http/supplierAPI";
import SelectToyCountBlock from "../../components/SelectToyCountBlock";
import classes from './AcceptProductPage.module.css';
import {updateToyCount} from "../../http/toyAPI";
import {useStateIfMounted} from "use-state-if-mounted";

const AcceptProductPage = () => {

    const [suppliersArray, setSuppliers] = useState([]);
    const [suppliersToys, setSuppliersToys] = useState([]);
    const [selectedToys, setSelectedToys] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useStateIfMounted('');

    useEffect(() => {
        fetchSuppliers().then(suppliers =>
            setSuppliers(suppliers)
        )
    }, []);

    async function getSuppliersToys() {
        const sel = document.getElementById("supplierSelect");
        const id = sel.options[sel.selectedIndex].value
        await fetchAllProducts(id).then(data =>
            setSuppliersToys(data)
        );
        setSelectedToys([]);
    }

    async function getSelectedToys() {
        const sel = document.getElementById("toySelect");
        const toys = [];
        for (let i = 0; i < sel.options.length; i++) {
            if (sel.options[i].selected) {
                const newObject = {
                    id: sel.options[i].value,
                    count: 0
                }
                toys.push(newObject);
            }
        }
        setSelectedToys(toys);
    }

    function submitForm(e) {
        e.preventDefault();
        if (selectedToys.length === 0) {
            alert('Выберите необходимые товары!')
        } else {
            try {
                selectedToys.map(toy =>
                    updateToyCount(toy.id, toy.count)
                )
            } catch (e) {
                alert(e.response.data.message);
            }
        }
    }

    return (
        <div className={classes.generalDiv}>
            <h1>Форма принятия товара</h1>
            <hr/>
            <div className={classes.supplierSelect}>
                <div className={classes.pStyle}>Выберите поставщика:</div>
                <div>
                    <select
                        id='supplierSelect'
                        required = {true}
                        value={selectedSupplier}
                        autoFocus
                        onChange={(e) => {setSelectedSupplier(e.target.value); getSuppliersToys()}}>
                        <option disabled value=''> -- Выберите поставщика -- </option>
                        {
                            suppliersArray.map(supplier =>
                                <option value={supplier.id} key={supplier.id}>{supplier.name}</option>
                            )
                        }
                    </select>
                </div>
            </div>

            <div>
                <div className={classes.pStyle}>Выберите необходимые товары:</div>
                {
                    suppliersToys.length > 0 &&
                    <div>
                        <select id='toySelect'
                                multiple="multiple"
                                required
                                size={suppliersToys.length}
                                onChange={getSelectedToys}
                        >
                            {
                                suppliersToys.map(toy =>
                                    <option value={toy.id} key={toy.id}>{toy.id} {toy.name}</option>
                                )
                            }
                        </select>
                    </div>
                }
            </div>

            <form onSubmit={submitForm}>
                {selectedToys.length > 0 &&
                    <div className={classes.pStyle}>Выберите необходимое количество товара:</div>
                }
                {selectedToys.map(toy =>
                    <SelectToyCountBlock key={toy.id} toy={toy}/>
                )}
                <button className={classes.formButton} type='submit'>Принять товар</button>
            </form>

        </div>
    );
};

export default AcceptProductPage;