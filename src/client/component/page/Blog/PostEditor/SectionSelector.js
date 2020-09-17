/* module */
import React, { useState, useEffect } from 'react';

const SectionSelector = ({onIndexChange}) => {
    const [options, setOptions] = useState([]);
    const [sectionValue, setSectionValue] = useState(0);

    const onChangeHandler = (event) => {
        setSectionValue(event.target.value);
        onIndexChange(event.target.value);
    }
    const readSectionOptions = () => {
        return new Promise((resolve, reject) => {
            fetch(`/request/blog/read/section`)
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
        readSectionOptions()
            .then((resolve) => {
                const sections = resolve;
                setOptions(sections.map(section => {
                    return (
                    <option
                        key={section.id}
                        value={section.id}
                        label={section.name}
                    ></option>
                )}));
            }, (reject) => alert(reject))
    }, []);

    return (
        <div>
            <div>Section</div>
            <select
                onChange={onChangeHandler}
            >{options}</select>
        </div>
    );
}

export default SectionSelector;