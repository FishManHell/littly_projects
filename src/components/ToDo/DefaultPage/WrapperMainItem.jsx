import React from 'react';
import ItemToDo from "./ItemToDo";
import InputComponent from "./InputComponent";
import FooterToDo from "./FooterToDo";
import MessageErrorComponent from "./MessageErrorComponent";

const WrapperMainItem = ({add, changeStyle, checkArrayItems, arrayItems, addFavorite, handleRemoveItem, setArrayItems}) => {


    return (
        <>
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
    )
};

export default WrapperMainItem;