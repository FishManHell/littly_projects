import React, {useEffect, useRef, useState} from 'react';

const headerImage = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/756881/laptop.svg'

const WrapperMainItem = () => {
    const refToDo = useRef(null);
    const [arrayItems, setArrayItems] = useState([]);
    const [favorites, setFavorites] = useState([]);

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
                <section>
                        <div>
                            <label>Text</label>
                            <input type="text" ref={refToDo}/>
                        </div>
                        <div>
                            <button onClick={() => handleAddItem(refToDo)}>Add</button>
                        </div>
                    <div>
                        {arrayItems?.map((text, index) => {
                            return (
                                <div>
                                    <span key={'text'}>{text}</span>
                                    <button onClick={() => handleRemoveItem(arrayItems, index, setArrayItems)}>remove
                                    </button>
                                    <button onClick={() => handleAddToFavorites(text)}>add to fav</button>
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