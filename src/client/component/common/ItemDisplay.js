import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const ItemDisplay = (props) => {
    /* store */
    const nightModeOn = useSelector(store => store.app.nightModeOn, []);

    /* props */
    const activated = props.activated;
    const itemSelected = props.itemSelected;
    const selectedCategory = props.selectedCategory;

    /* state */
    const [itemContainerListStyle, setItemContainerListStyle] = useState({});
    const [itemSizeStyle, setItemSizeStyle] = useState({});
    
    /* useEffect */
    useEffect(() => {
        if (activated) {
            /* constant */
            const categoryItems = selectedCategory.items;
            const itemsAmount = categoryItems.length;
            let itemHeight;
            if (window.innerWidth > 1300) {
                itemHeight = 8;
            } else if (window.innerWidth > 768) {
                itemHeight = 6;
            } else {
                itemHeight = 5;
            }


            /* style */
            setItemContainerListStyle({
                height: (itemHeight * itemsAmount) + 'rem',
                overflow: 'auto'
            });
            setItemSizeStyle({
                height: itemHeight + 'rem'
            });
        } else {
            setItemContainerListStyle({
                height: '0',
                overflow: 'hidden'
            });
        }
    }, [activated]);

    return (
            <div className={`ItemDisplay ` +
            `${itemSelected ?
                "ItemDisplay--appear" :
                "ItemDisplay--disappear"} ` +
            `${nightModeOn ?
                "ItemDisplay--night-mode" : ""} `}
            style={itemContainerListStyle}>
            {selectedCategory && selectedCategory.items.map((item, index) =>
                <div className={"ItemDisplay__item-container " + 
                    `${nightModeOn ? 
                        "ItemDisplay__item-container--night-mode" : ""} `}
                    style={itemSizeStyle}
                    key={index}>
                    <div className="ItemDisplay__item-toggle">
                        <div className={"ItemDisplay__item " +
                            `${nightModeOn ?
                                "ItemDisplay__item--night-mode" : ""} `}>
                            <img className="ItemDisplay__item-image"
                                src={item.imagePath} />
                        </div>
                        <h2 className={"ItemDisplay__item-title " +
                            `${nightModeOn ?
                                "ItemDisplay__item-title--night-mode" : ""} `}>
                            {item.title}
                        </h2>
                    </div>
                    <div className={"ItemDisplay__item-description " +
                        `${nightModeOn ?
                            "ItemDisplay__item-description--night-mode" : ""} `}>
                        {item.description}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ItemDisplay;