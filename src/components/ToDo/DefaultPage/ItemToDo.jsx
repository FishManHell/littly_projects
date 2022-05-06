import React, {useState} from 'react';
import {favoriteSolid, Pen, removeSolid} from "../../../utils/Font_Awesome/Solid";
import {favoriteRegular} from "../../../utils/Font_Awesome/Regular";
import {useLocation} from "react-router-dom";


const ItemToDo = ({text, remove, addFavorite, id}) => {
    const location = useLocation().pathname
    const [checkButton, setCheckButton] = useState(true);
    function addToFavorites() {
        addFavorite(text, id)
        setCheckButton(false)
    }

    return (
        <ul className={'sectionToDo__blockItem'}>
            <li key={'text'} className={'sectionToDo__itemText'}>{text}</li>
            <div className={'sectionToDo__wrapper_buttonItem'}>
                {location === '/' && <button className={'sectionToDo__buttonItem edit'}>{Pen}</button>}
                {location === '/' && <button className={'sectionToDo__buttonItem favorites'} onClick={addToFavorites}>{checkButton ? favoriteRegular : favoriteSolid}</button>}
                <button className={'sectionToDo__buttonItem remove'} onClick={remove}>{removeSolid}</button>
            </div>
        </ul>
    );
};

export default ItemToDo;