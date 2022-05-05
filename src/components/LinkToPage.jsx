import React from 'react';

const LinkToPage = ({linkPage, icon}) => {
    return (
        <div className={'favoritesButton'}>
            <button onClick={() => linkPage('link')}>{icon('icon')}</button>
        </div>
    );
};

export default LinkToPage;