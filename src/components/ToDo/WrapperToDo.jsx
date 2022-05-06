import React, {useEffect, useState} from 'react';
import {Routes, Route, useNavigate, useLocation} from "react-router-dom";
import WrapperMainItem from "./DefaultPage/WrapperMainItem";
import WrapperFavorites from "./Favorites/WrapperFavorites";
import {v4 as uuidv4} from "uuid";
import HeaderToDo from "./DefaultPage/HeaderToDo";
import {headerImage} from "../../utils/images";
import LinkToPage from "../LinkToPage";
import {Heart, House} from "../../utils/Font_Awesome/Regular";
import FooterToDo from "./DefaultPage/FooterToDo";

const WrapperToDo = () => {
    const navigate = useNavigate();
    const location = useLocation();
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

    const switchLinkIconText = (value) => {
        const pathName = location.pathname
        switch (value) {
            case 'link':
                return  pathName === '/' ? navigate('/favorites') : navigate('/')
            case 'icon':
                return pathName === '/' ? Heart : House
            case 'text':
                return pathName === '/' ? 'ToDo List' : 'Favorites'
            default:
                return -1
        }
    }

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
                <LinkToPage linkPage={switchLinkIconText} icon={switchLinkIconText}/>
                <HeaderToDo image={headerImage} text={switchLinkIconText}/>
                <Routes>
                    <Route path={'/'} element={<WrapperMainItem {...funcPutProps()}/>}/>
                    <Route path={'/favorites'} element={<WrapperFavorites
                        favorites={favorites}
                        setFavorites={setFavorites}
                        remove={handleRemoveItem}
                    />}/>
                </Routes>
                <FooterToDo text={"Please don't forget subscribe:_)"}/>
            </div>
        </div>

    );
};

export default WrapperToDo;