import React, { useState, useEffect } from 'react';

const ItemDisplay = (props) => {
    /* props */
    const activated = props.activated;
    const itemSelected = props.itemSelected;
    const selectedCategory = props.selectedCategory;

    /* state */
    const [itemContainerListStyle, setItemContainerListStyle] = useState({});
    const [itemSizeStyle, setItemSizeStyle] = useState({});

    useEffect(() => {
        if (activated) {
            /* constant */
            const categoryItems = selectedCategory.items;
            const itemsAmount = categoryItems.length;
            const itemHeight = 8;

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
                "ItemDisplay--disappear"}`}
            style={itemContainerListStyle}>
            {selectedCategory && selectedCategory.items.map((item, index) =>
                <div className="ItemDisplay__item-container"
                    style={itemSizeStyle}
                    key={index}>
                    <div className="ItemDisplay__item-toggle">
                        <div className="ItemDisplay__item">
                            <img className="ItemDisplay__item-image"
                                src={item.imagePath} />
                        </div>
                        <h2 className="ItemDisplay__item-title">
                            {item.title}
                        </h2>
                    </div>
                    <div className="ItemDisplay__item-description">
                        {item.description}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ItemDisplay;