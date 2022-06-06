import Loader from "./UI/loader/Loader";
import React from "react";

export function setContentLoading(content, totalCount, loading){
    if(loading){
        return <Loader/>
    }else{
        if(totalCount === 0){
            return <h1>Данные не найдены!</h1>;
        }else{
            return content;
        }
    }
}