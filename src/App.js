import React from 'react';
import WrapperToDo from "./components/ToDo/WrapperToDo";

const App = () => {
    console.log('Hello World')
    return (
        <div className={'mainWrapper'}>
            <WrapperToDo/>
        </div>
    );
};

export default App;