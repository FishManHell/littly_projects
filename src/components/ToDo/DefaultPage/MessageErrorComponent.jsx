import React from 'react';

const MessageErrorComponent = ({error, check}) => {
    return check && <p className={'messageError'}>{error}</p>
};

export default MessageErrorComponent;