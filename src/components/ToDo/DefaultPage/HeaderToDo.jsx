import React from 'react';

const HeaderToDo = ({image, text}) => {
    return (
        <header className={'header'}>
            <div className={'header__image'}>
                <img src={image} alt="I don't see picture"/>
            </div>
            <h1 className={'header__title'}>{text('text')}</h1>
        </header>
    );
};

export default HeaderToDo;