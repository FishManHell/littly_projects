import React from 'react';
import ItemToDo from "../DefaultPage/ItemToDo";

const WrapperFavorites = ({favorites, remove, setFavorites}) => {
    return (
        <div className={'sectionFavorites'}>
            <div className={'sectionFavorites__wrapperItems'}>
                {favorites?.map(elem => <ItemToDo
                    key={elem.id} {...elem}
                    remove={() => remove(favorites, elem.id, setFavorites, true)}/>
                )}
            </div>
        </div>
    );
};

export default WrapperFavorites;