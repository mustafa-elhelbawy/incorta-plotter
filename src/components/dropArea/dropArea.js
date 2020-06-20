import React from "react";
import "./dropArea.scss";

const DropArea = ({
    wrapperClass,
    droppable,
    label,
    items,
    actions
}) => {
  return (
    <div className={`${wrapperClass}`}>
        <label className={`${label.class} dropAreaLabel d-inline-block text-left`}> 
            {label?.text}
        </label>
        <div data-allowed={items.function} 
        className={droppable.class}
        onDragOver={droppable.listeners.dragover} onDrop={droppable.listeners.drop}>
            {
                items.param && 
                <span className={items.class}>
                {items.param[items.key]}
                </span>
            }
        </div>
        {
            actions.clear &&
            <button onClick={(event) => actions.clear.click(event, items.function)}
            className={actions.clear.class}>
                {actions.clear.text}
            </button>
        }
    </div>
  );
};

export default DropArea;
