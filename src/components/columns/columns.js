import React from "react";
import "./columns.scss";

const Columns = ({
    attr,
    list,
    item,
    item: {
        prefix,
        listeners,
        key
    }
}) => {
  return (
    <ul className={attr.class}>
        {
            list.map((col, i) => (
            <li 
                className={`${item.class} colItem`}
                key={`${prefix}${i}`} 
                id={`${prefix}${i}`} 
                draggable={item.attr.draggable}
                onDragStart={(event) => listeners.dragstart(event, JSON.stringify(col))}>
                {col[key]}
            </li>
            ))
        }
    </ul>
  );
};

export default Columns;
