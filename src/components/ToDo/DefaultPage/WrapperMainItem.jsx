import React, {useEffect, useState} from 'react';
import ItemToDo from "./ItemToDo";
import InputComponent from "./InputComponent";
import HeaderToDo from "./HeaderToDo";
import FooterToDo from "./FooterToDo";
import {v4 as uuidv4} from 'uuid'
import MessageErrorComponent from "./MessageErrorComponent";
import {Heart} from "../../../utils/Font_Awesome/Regular";

const headerImage = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/756881/laptop.svg'

const WrapperMainItem = () => {
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

    const handleAddToFavorites = (id) => {
        const array = [...favorites]
        if (!array.includes(id)) {
            array.push(id)
            setFavorites(array)
            localStorage.setItem('favorites', JSON.stringify(array))
        }
    }

    const changeStyle = (value) => !checkArrayItems ? value : ''

    return (
        <div className={'containerToDo'}>
            <div className={'wrapperToDo'}>
                <div className={'favoritesButton'}>
                    <button>{Heart}</button>
                </div>
                <HeaderToDo image={headerImage} text={'ToDo List'}/>
                <section className={'sectionToDo'}>
                    <InputComponent add={handleAddItem} checkArray={changeStyle} checkArrayItems={checkArrayItems}/>
                    <div className={'sectionToDo__wrapperItems'}>
                        {arrayItems?.map(elem => <ItemToDo
                            key={elem.id} {...elem} add={handleAddToFavorites}
                            remove={() => handleRemoveItem(arrayItems, elem.id, setArrayItems, false)}/>
                        )}
                    </div>
                </section>
                <MessageErrorComponent error={"You can add just 5 items"} check={arrayItems.length >= 5}/>
                <FooterToDo text={"Please don't forget subscribe:_)"}/>

            </div>
        </div>
    );
};

export default WrapperMainItem;