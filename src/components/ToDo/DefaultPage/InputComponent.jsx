import React, {useRef} from 'react';

const InputComponent = ({add, checkArray, checkArrayItems}) => {
    const refToDo = useRef(null);

    return (
        <div className={'sectionToDo__wrapperInputField'}>
            <label className={'sectionToDo__inputLabel'}>add what you want</label>
            <div className={'sectionToDo__inputTodo'}>
                <input type="text" ref={refToDo} className={`sectionToDo__input ${checkArray('sectionToDo__blockInput')}`} disabled={!checkArrayItems}/>
                <div className={`sectionToDo__buttonToDo ${checkArray('sectionToDo__blockButtonToDo')}`}>
                    <button onClick={() => add(refToDo)} disabled={!checkArrayItems}>
                        <span>Add</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InputComponent;