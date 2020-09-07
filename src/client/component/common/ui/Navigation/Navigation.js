import React, { useState } from 'react';

import CategoryList from 'component/Blog/CategoryList/CategoryList';
import Auth from './Auth/Auth'

import './Navigation.scss';

function Navigation() {
    
    let clicked = false;
    const onClickHandler = () => {
        if (clicked) {
            

            clicked = false;
        } else {


            clicked = true;
        }
        console.log(clicked);
    }

    return (
        <div className="Navigation">
            <button className="Navigation__icon-container"
                onClick={onClickHandler}
            >
                <svg className="Navigation__icon"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
                </svg>
            </button>
            <div className="Navigation__slide-container">
                <Auth></Auth>
                <CategoryList link={true}></CategoryList>
            </div>
        </div>
    );
}

export default Navigation;