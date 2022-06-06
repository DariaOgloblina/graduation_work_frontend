import React, {useState} from 'react';
import ToyBlock from "../../components/ToyBlock";
import Pages from "../../components/UI/pages/Pages";
import ToyRedactorModal from "../../components/UI/toyRedactorModal/ToyRedactorModal";
import {observer} from "mobx-react-lite";
import classes from './ToysPage.module.css'
import {filterMinCount, findByFilterId, findByFilterName} from "../../components/Filter";

const ToysContent = observer(({
                                  toy, suppliers, list, filterList, setFilterList,
                                  toyCreatorVisible, setToyCreatorVisible, isCreate
}) => {

    const [supplierIsChecked, setSupplierIsChecked] = useState(false);
    const [smallQuantityIsChecked, setSmallQuantityIsChecked] = useState(false);
    const [filterName, setFilterName] = useState('');
    const [filterId, setFilterId] = useState('');

    function setFilterButtonClick() {
        if (supplierIsChecked) {
            const select = document.getElementById('selectSupplier');
            toy.setSelectedSupplier(select.value);
        }
        if (smallQuantityIsChecked) {
            filterMinCount(list, setFilterList).then((newList) =>{
                if (filterName) {
                    findByFilterName(newList, filterName, setFilterList).then(newList =>{
                            if (filterId) {
                                findByFilterId(newList, filterId, setFilterList).then(newList =>
                                    setFilterList(newList)
                                );
                            }
                    });
                }else if (filterId) {
                    findByFilterId(newList, filterId, setFilterList).then(newList =>
                        setFilterList(newList)
                    );
                }
            });
        }else if (filterName) {
            findByFilterName(list, filterName, setFilterList).then(newList =>{
                if (filterId) {
                    findByFilterId(newList, filterId, setFilterList).then(newList =>
                        setFilterList(newList)
                    );
                }
            });
        }else if (filterId) {
            findByFilterId(list, filterId, setFilterList).then(newList =>
                setFilterList(newList)
            );
        }else {
            setFilterList(list);
        }
        //
        // toy.setToys(filterList);
        // toy.setTotalCount(filterList.length);
    }

    return (
        <div>
            <h3>Установить фильтр</h3>
            <div className={classes.divWithFilters}>
                <div className={classes.filterBox}>
                    По поставщику:<input id='supplier' type='checkbox' onClick={() => {
                    if(supplierIsChecked){
                        toy.setSelectedSupplier('');
                    }
                    setSupplierIsChecked(!supplierIsChecked);
                }}/>
                    <br/>
                    Необходимо докупить <input id='minCount' type='checkbox' onClick={() => {
                    setSmallQuantityIsChecked(!smallQuantityIsChecked);
                }}/>
                </div>

                <div className={classes.filterBox}>
                    <input type='text' placeholder='Поиск по артикулу' value={filterId}
                           onChange={(e) => setFilterId(e.target.value)}/>
                    <input type='text' placeholder='Поиск по названию' value={filterName}
                           onChange={(e) => setFilterName(e.target.value)}/>
                </div>
                <button onClick={setFilterButtonClick}>Применить</button>
            </div>
            {supplierIsChecked &&
                <div className={classes.selectWithSuppliers}>
                    Выберите поставщика:
                    <select id='selectSupplier'>
                        {suppliers.map(supplier =>
                            <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                        )
                        }
                    </select>
                </div>
            }

            <div className={classes.divWithCreateButton}>
                <button onClick={() => setToyCreatorVisible(true)}>Добавить новый товар</button>
            </div>

            <h1>Товары:</h1>
            {filterList.length > 0
                ? filterList.map(toy =>
                        <ToyBlock key={toy.id} toy={toy}/>)
                : <h2 className={classes.h2NotFound}>Товары не найдены!</h2>
            }

            <Pages/>
            <ToyRedactorModal
                visible={toyCreatorVisible}
                setVisible={setToyCreatorVisible}
                isCreate={isCreate}
            />
        </div>
    );
});

export default ToysContent;