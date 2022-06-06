import React from 'react';
import ImageBlock from "../components/UI/imageBlock/ImageBlock";
import DescriptionCompanyBlock from "../components/UI/descriptionCompanyBlock/DescriptionCompanyBlock";
import JobInformationDiv from "../components/UI/jobInformationDiv/jobInformationDiv";
import LoginModal from "../components/UI/loginModal/LoginModal";
import {observer} from "mobx-react-lite";

const MainPage = observer(({visible, setVisible}) => {
    return (
        <div>
            <LoginModal visible = {visible} setVisible= {setVisible}/>
            <ImageBlock setVisible={setVisible}/>
            <DescriptionCompanyBlock/>
            <JobInformationDiv/>
        </div>
    );
});

export default MainPage;