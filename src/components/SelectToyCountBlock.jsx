import React, {useEffect} from 'react';
import classes from '../pages/acceptProductPage/AcceptProductPage.module.css';
import {fetchOneToy} from "../http/toyAPI";
import {useStateIfMounted} from "use-state-if-mounted";

const SelectToyCountBlock = ({toy}) => {

    const [toyName, setToyName] = useStateIfMounted('');

    useEffect(() =>{
        try{
            fetchOneToy(toy.id).then(toyItem =>
                setToyName(toyItem.name)
            )
        }catch (e){
            alert(e.response.data.message);
        }
    },[]);

    return (
        <div className={classes.selectToyBlock}>
            <div className={classes.selectToyBlockItem}>
                {toy.id}
            </div>
            <div className={classes.selectToyBlockItem}>
                {toyName}
            </div>
            <input
                id={toy.id}
                required='required'
                type="number"
                placeholder="0"
                min="1"
                max="500"
                step="1"
                onChange={(e) => {toy.count = e.target.value}}
            />
        </div>
    );
};

export default SelectToyCountBlock;