import React, { useEffect, useState } from 'react';
import category from '../../../../server/db/queries/blog/category';

import './CategorySelector.css'

function CategorySelector({ onIndexChange, sectionValue }) {
    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState(undefined);

    const onChangeHandler = (event) => {
        setSelectedValue(event.target.value);
        onIndexChange(selectedValue);
    }
    const readCategoryOptions = () => {
        return new Promise((resolve, reject) => {
            const PAGE = 'postEditor';
            fetch(`/request/blog/read/category?page=${PAGE}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (result) {
                    const isSuccess = result.validity;
                    if (isSuccess) {
                        resolve(result.value);
                    } else {
                        reject(result.value);
                    }
                });
        });
    }

    useEffect(() => {
        (async () => {
            let categoryOptions;
            await readCategoryOptions()
                .then((resolve) => {
                    categoryOptions = resolve;
                }, (reject) => alert(reject))
            setOptions(categoryOptions)
        })();
    }, []);

    useEffect(() => {
        let isSelected = false;
        options.forEach(option => {
            const keyValue = option.id;
            const isHidden = option.section_id !== Number(sectionValue);
            if (!(isSelected || isHidden)) {
                setSelectedValue(keyValue);
                isSelected = true;
            }
        })
    }, [sectionValue])

    return (
        <div>
            <div>Category</div>
            <select
                value={selectedValue}
                onChange={onChangeHandler}>
                {
                    options.map(option => {
                        const keyValue = option.id;
                        const nameValue = option.name;
                        const sectionIdValue = option.section_id;
                        const hiddenValue = sectionIdValue !== Number(sectionValue);
                        return (
                            <option
                                key={keyValue}
                                value={keyValue}
                                label={nameValue}
                                hidden={hiddenValue}
                            ></option>
                        );
                    })
                }
            </select>
        </div>
    );
}

export default CategorySelector;