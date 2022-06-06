import React, {useEffect, useState} from 'react';
import {createToy, updateToy} from "../../../http/toyAPI";
import {fetchSuppliers} from "../../../http/supplierAPI";
import {createLocation, updateLocation} from "../../../http/warehouseAPI";

const ToyRedactorForm = ({toy, toyInfo, supplier, location, setVisible, isCreate}) => {

    let wordOnButton;
    let wordInHeader;
    const [suppliers, setSuppliers] = useState([]);
    const [toyName, setToyName] = useState('');
    const [toyId, setToyId] = useState('');
    const [toyPrice, setToyPrice] = useState('1');
    const [toyMaterial, setToyMaterial] = useState('');
    const [toyHeight, setToyHeight] = useState('1');
    const [toyWeight, setToyWeight] = useState('');
    const [toyDescription, setToyDescription] = useState('');
    const [toyCount, setToyCount] = useState('0');
    const [toyLocation, setToyLocation] = useState('');
    const [toySupplier, setToySupplier] = useState('');

    if(isCreate){
        wordOnButton = 'Создать';
        wordInHeader = 'создания';
    }else {
        wordOnButton = 'Редактировать';
        wordInHeader = 'редактирования';
    }

    useEffect(() => {
        if(!isCreate){
            setToyId(String(toy.id));
            setToyName(String(toy.name));
            setToyPrice(String(toy.price));
            setToyMaterial(String(toyInfo.material));
            setToyHeight(String(toyInfo.height));
            if(toyInfo.width){
                setToyWeight(String(toyInfo.width));
            }
            setToyDescription(String(toyInfo.description));
            setToyCount(String(location.current_count));
            setToyLocation(String(location.location));
            setToySupplier(String(supplier.id));
        }
        fetchSuppliers().then(suppliers =>
            setSuppliers(suppliers)
        )
    },[])

    async function redactorFormSubmit(event) {
        try {
            event.preventDefault();
            if(isCreate){
                await createToy(
                    Number(toyId),
                    toyName,
                    Number(toyPrice),
                    toyId+'.jpg',
                    Number(toySupplier),
                    toyDescription,
                    Number(toyHeight),
                    Number(toyWeight),
                    toyMaterial
                    );
                await createLocation(
                    toyLocation,
                    toyCount,
                    toyId
                );
            }else{
                await updateToy(
                    toy.id,
                    toyName,
                    Number(toyPrice),
                    toy.img,
                    Number(toySupplier),
                    toyDescription,
                    Number(toyHeight),
                    Number(toyWeight),
                    toyMaterial
                    );
                await updateLocation(
                    location.id,
                    toyLocation,
                    Number(toyCount),
                    Number(toyId)
                );
            }
            setVisible(false);
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        } catch (e) {
            alert(e.response.data.message);
        }
    }

    return (
        <div>
            <h3>Форма для {wordInHeader} товара</h3>
            <form onSubmit={redactorFormSubmit}>
                <p>Артикул</p>
                {isCreate &&
                    <input
                        type='text'
                        placeholder='Введите артикул'
                        value={toyId}
                        onChange={(e) => setToyId(e.target.value)}
                        required={true}
                    />
                }
                {!isCreate && toyId}

                <p>Название</p>
                <input
                    type='text'
                    placeholder='Введите название'
                    value={toyName}
                    onChange={(e) => setToyName(e.target.value)}
                    required={true}
                />
                <p>Цена</p>
                <input
                    type='number'
                    min='1'
                    placeholder='Введите цену'
                    value={toyPrice}
                    onChange={(e) => setToyPrice(e.target.value)}
                    required={true}
                />
                <p>Материал</p>
                <input
                    type='text'
                    placeholder='Введите название материала/ов'
                    value={toyMaterial}
                    onChange={(e) => setToyMaterial(e.target.value)}
                    required={true}
                />
                <p>Высота</p>
                <input
                    type='text'
                    placeholder='Введите высоту товара'
                    value={toyHeight}
                    onChange={(e) => setToyHeight(e.target.value)}
                    required={true}
                />
                <p>Вес</p>
                <input
                    type='text'
                    placeholder='Введите вес'
                    value={toyWeight}
                    onChange={(e) => setToyWeight(e.target.value)}
                />
                <p>Описание</p>
                <textarea
                    placeholder='Введите описание'
                    value={toyDescription}
                    onChange={(e) => setToyDescription(e.target.value)}
                    required={true}
                />
                <p>Количество на складе</p>
                <input
                    type='number'
                    placeholder='Введите количество'
                    min='1'
                    value={toyCount}
                    onChange={(e) => setToyCount(e.target.value)}
                    required={true}
                />
                <p>Локация</p>
                <input
                    type='text'
                    placeholder='Введите локацию товара на складе'
                    value={toyLocation}
                    onChange={(e) => setToyLocation(e.target.value)}
                />
                <p>Производитель</p>
                <select value={toySupplier} onChange={(e) => setToySupplier(e.target.value)}>
                    <option disabled value=''> -- Выберите поставщика -- </option>
                    {
                        suppliers.map(supplier =>
                            <option
                                value={supplier.id}
                                key={supplier.id}
                            >
                                {supplier.name}
                            </option>
                        )
                    }
                </select>
                <button type='submit'>{wordOnButton}</button>
            </form>
        </div>
    );
};

export default ToyRedactorForm;