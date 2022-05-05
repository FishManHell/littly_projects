import React, {useEffect, useState} from 'react';
import {Routes, Route} from "react-router-dom";
import WrapperMainItem from "./DefaultPage/WrapperMainItem";
import WrapperFavorites from "./Favorites/WrapperFavorites";
import {v4 as uuidv4} from "uuid";

const WrapperToDo = () => {
    const [arrayItems, setArrayItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [checkArrayItems, setCheckArrayItems] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('favorites')) {
            const array = JSON.parse(localStorage.getItem('favorites'))
            setFavorites(array)
        }
    }, [])

    useEffect(() => {
        if (arrayItems.length >= 5) {
            setCheckArrayItems(false)
        } else {
            setCheckArrayItems(true)
        }
    }, [arrayItems.length]);


    const handleRemoveItem = (array, id, setFunc, check) => {
        const copyArray = [...array], index = copyArray.findIndex(elem => elem.id === id);
        if (index > -1) copyArray.splice(index, 1)
        setFunc(copyArray);
        if (check) localStorage.setItem('favorites', JSON.stringify(copyArray));
    }

    const handleAddItem = (ref) => {
        const value = ref.current.value, copyArray = [...arrayItems],
            checkInArray = copyArray.every(item => item.text !== value), id = uuidv4();

        if (!value.length) alert("You can't send clear field")

        if (checkInArray && value.length) {
            copyArray.push({id, text: value})
            setArrayItems(copyArray)
            ref.current.value = ''
        }
    }

    const handleAddToFavorites = (text, id) => {
        const array = [...favorites],
            item = array.every(elem => elem.id !== id && elem.text !== text)
        if (item) {
            array.push({id, text})
            setFavorites(array)
            localStorage.setItem('favorites', JSON.stringify(array))
        }
    }

    const changeStyle = (value) => !checkArrayItems ? value : ''


    const funcPutProps = () => ({
        add: handleAddItem,
        changeStyle: changeStyle,
        checkArrayItems: checkArrayItems,
        addFavorite: handleAddToFavorites,
        handleRemoveItem: handleRemoveItem,
        setArrayItems: setArrayItems,
        arrayItems: arrayItems
    })

    return (
        <div className={'containerToDo'}>
            <div className={'wrapperToDo'}>
                <Routes>
                    <Route path={'/'} element={<WrapperMainItem {...funcPutProps()}/>}/>
                    <Route path={'/favorites'} element={<WrapperFavorites/>}/>
                </Routes>
            </div>
        </div>

    );
};

export default WrapperToDo;