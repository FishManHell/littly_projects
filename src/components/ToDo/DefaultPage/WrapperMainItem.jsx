import React from 'react';
import ItemToDo from "./ItemToDo";
import InputComponent from "./InputComponent";
import HeaderToDo from "./HeaderToDo";
import FooterToDo from "./FooterToDo";
import MessageErrorComponent from "./MessageErrorComponent";
import {Heart} from "../../../utils/Font_Awesome/Regular";

const headerImage = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/756881/laptop.svg'

const WrapperMainItem = ({add, changeStyle, checkArrayItems, arrayItems, addFavorite, handleRemoveItem, setArrayItems}) => {

    return (
        <>
            <div className={'favoritesButton'}>
                <button>{Heart}</button>
            </div>
            <HeaderToDo image={headerImage} text={'ToDo List'}/>
            <section className={'sectionToDo'}>
                <InputComponent add={add} checkArray={changeStyle} checkArrayItems={checkArrayItems}/>
                <div className={'sectionToDo__wrapperItems'}>
                    {arrayItems?.map(elem => <ItemToDo
                        key={elem.id} {...elem} addFavorite={addFavorite}
                        remove={() => handleRemoveItem(arrayItems, elem.id, setArrayItems, false)}/>
                    )}
                </div>
            </section>
            <MessageErrorComponent error={"You can add just 5 items"} check={arrayItems.length >= 5}/>
            <FooterToDo text={"Please don't forget subscribe:_)"}/>
        </>


    );
};

export default WrapperMainItem;