import React, { useState } from 'react';
import './Navigation.css';

import CategoryList from 'component/Blog/CategoryList/CategoryList';
import Auth from './Auth/Auth'

function Navigation() {
    const [isClicked, setIsClicked] = useState(false);

    const onClickHandler = () => { 
        if (isClicked) {
            setIsClicked(false);
        } else {
            setIsClicked(true);
        }
        console.log(isClicked);
    }
    return (
        <button 
            className="Navigation"
            onClick={onClickHandler} >
            <svg 
                className="Navigation__icon"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
            </svg>

            <div className="Navigation__slide-container">
                {/* <Auth ></Auth> */}
                {/* <CategoryList link={true}></CategoryList> */}
            </div>
        </button>
    );
}

export default Navigation;