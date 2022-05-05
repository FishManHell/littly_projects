import React from 'react';

const FooterToDo = ({text}) => {
    return (
        <footer className={'footerToDo'}>
            <p className={'footerToDo__text'}>{text}</p>
        </footer>
    );
};

export default FooterToDo;