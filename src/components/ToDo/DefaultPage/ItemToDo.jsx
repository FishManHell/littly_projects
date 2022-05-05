import React, {useState} from 'react';
import {favoriteSolid, Pen, removeSolid} from "../../../utils/Font_Awesome/Solid";
import {favoriteRegular} from "../../../utils/Font_Awesome/Regular";


const ItemToDo = ({text, remove, addFavorite, id}) => {
    const [checkButton, setCheckButton] = useState(true);
    function addToFavorites() {
        addFavorite(text, id)
        setCheckButton(false)
    }

    return (
        <ul className={'sectionToDo__blockItem'}>
            <li key={'text'} className={'sectionToDo__itemText'}>{text}</li>
            <div className={'sectionToDo__wrapper_buttonItem'}>
                <button className={'sectionToDo__buttonItem edit'}>{Pen}</button>
                <button className={'sectionToDo__buttonItem favorites'} onClick={addToFavorites}>{checkButton ? favoriteRegular : favoriteSolid}</button>
                <button className={'sectionToDo__buttonItem remove'} onClick={remove}>{removeSolid}</button>
            </div>
        </ul>
    );
};

export default ItemToDo;