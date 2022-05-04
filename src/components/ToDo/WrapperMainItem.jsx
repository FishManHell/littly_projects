import React, {useEffect, useRef, useState} from 'react';
import {favoriteSolid, removeSolid} from "../../utils/Font_Awesome/Solid";
import {favoriteRegular, removeRegular} from "../../utils/Font_Awesome/Regular";

const headerImage = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/756881/laptop.svg'

const WrapperMainItem = () => {
    const refToDo = useRef(null);
    const [arrayItems, setArrayItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [checkButton, setCheckButton] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('favorites')) {
            const array = JSON.parse(localStorage.getItem('favorites'))
            setFavorites(array)
        }
    }, [])

    const handleRemoveItem = (array, index, setFunc, check) => {
        const copyArray = [...array];
        copyArray.splice(index, 1)
        setFunc(copyArray);
        if (check) {
            localStorage.setItem('favorites', JSON.stringify(copyArray));
        }
    }


    const handleAddItem = (ref) => {
        const array = [...arrayItems]
        if (!array.includes(ref.current.value)) {
            array.push(ref.current.value)
            setArrayItems(array)
            ref.current.value = ''
        }
    }


    const handleAddToFavorites = (item) => {
        const array = [...favorites]
        if (!array.includes(item)) {
            array.push(item)
            setFavorites(array)
            localStorage.setItem('favorites', JSON.stringify(array))
        }
        setCheckButton(false)
    }


    return (
        <div className={'containerToDo'}>
            <div className={'wrapperToDo'}>
                <header className={'header'}>
                    <div className={'header__image'}>
                        <img src={headerImage} alt="image"/>
                    </div>
                    <h1 className={'header__title'}>ToDo List</h1>
                </header>
                <section className={'sectionToDo'}>
                    <div className={'sectionToDo__wrapperInputField'}>
                        <label className={'sectionToDo__inputLabel'}>Add some item</label>
                        <div className={'sectionToDo__inputTodo'}>
                            <input type="text" ref={refToDo} className={'sectionToDo__inout'}/>
                            <div className={'sectionToDo__buttonToDo'}>
                                <button onClick={() => handleAddItem(refToDo)}>
                                    <span>Add</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={'sectionToDo__wrapperItems'}>
                        {arrayItems?.map((text, index) => {
                            return (
                                <div className={'sectionToDo__blockItem'}>
                                    <span key={'text'} className={'sectionToDo__itemText'}>{text}</span>
                                    <button className={'sectionToDo__buttonItem remove'} onClick={() => handleRemoveItem(arrayItems, index, setArrayItems)}>{removeSolid}</button>
                                    <button className={'sectionToDo__buttonItem favorites'} onClick={() => handleAddToFavorites(text)}>{checkButton ? favoriteRegular : favoriteSolid}</button>
                                </div>
                            )
                        })}
                    </div>
                </section>
                <footer>
                    <p>Please don't forget subscribe</p>
                </footer>
            </div>
        </div>
    );
};

export default WrapperMainItem;