/* module */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/* text */
import text from '~/../../.private/text/page/career/portfolio/portfolio.json';

/* file */
import portfolio from '~/../../.private/file/portfolio/portfolio.pdf'

/* component */
import PortfolioFile from './PortfolioFile'

const PortfolioViewer = () => {
    /* state */
    const [pageAmount, setPageAmount] = useState(null);
    const [pageIndex, setPageIndex] = useState(1);

    const [categoryIndex, setCategoryIndex] = useState(0);

    const [progressBarStyle, setProgressBarStyle] = useState({
        width: 0
    });

    /* constant */
    const categories = text.category;

    const selectedCategoryStyle = {
        "background-color": "hsl(167, 100%, 50%)",
        opacity: 1
    }

    /* event handler */
    const previousPageClicked = event => {
        const newPageIndex = pageIndex - 1 < 1 ? 1 : pageIndex - 1;

        setPageIndex(newPageIndex);

        let categoryIndex = 0;
        categories.forEach((category, index) => {
            const categoryStartIndex = category.start;

            if (categoryStartIndex <= newPageIndex) {
                categoryIndex = index;
                return;
            }
        })

        setCategoryIndex(categoryIndex);
    };

    const nextPageClicked = event => {
        const newPageIndex = pageIndex + 1 > pageAmount ? pageAmount : pageIndex + 1;

        setPageIndex(newPageIndex);

        let categoryIndex = 0;
        categories.forEach((category, index) => {
            const categoryStartIndex = category.start;

            if (categoryStartIndex <= newPageIndex) {
                categoryIndex = index;

                return;
            }
        })

        setCategoryIndex(categoryIndex);
    };

    const categoryButtonClicked = (index, startIndex) => {
        setCategoryIndex(index);
        setPageIndex(startIndex)
    }

    /* useEffect */
    useEffect(() => {
        setProgressBarStyle({
            width: `${Math.floor(pageIndex / pageAmount * 100)}%`
        });
    }, [pageIndex, pageAmount])

    return (
        <main className="PortfolioViewer">
            <section className="PortfolioViewer__header">
                <h1 className="PortfolioViewer__header-title">Portfolio</h1>
                <h2 className="PortfolioViewer__header-subtitle">
                    {text.header.subtitle}
                </h2>
            </section>
            <section className="PortfolioViewer__file-container">
                <PortfolioFile
                    pageIndex={pageIndex}
                    onLoad={amount => setPageAmount(amount)} />
                <div className="PortfolioViewer__file-progress-bar-container">
                    <div className="PortfolioViewer__file-progress-bar"
                        style={progressBarStyle}></div>
                </div>
            </section>
            <section className="PortfolioViewer__control-container">
                <section className="PortfolioViewer__download">
                    <h2 className="PortfolioViewer__download-title">Downlaod File</h2>
                    <Link className="PortfolioViewer__download-link"
                        to={portfolio} target="_blank" download={text.download}>
                        {text.download}
                    </Link>
                </section>
                <section className="PortfolioViewer__category">
                    <h2 className="PortfolioViewer__category-title">Select Project</h2>
                    <div className="PortfolioViewer__category-button-container">
                        {categories.map((category, index) =>
                            <button className="PortfolioViewer__category-button"
                                key={index}
                                onClick={event => categoryButtonClicked(index, category.start)}>
                                <div className="PortfolioViewer__category-button-indicator"
                                    style={index === categoryIndex ? selectedCategoryStyle : {}}></div>
                                <div className="PortfolioViewer__category-button-text">{category.title}</div>
                            </button>
                        )}
                    </div>
                </section>
                <section className="PortfolioViewer__controller">
                    <h2 className="PortfolioViewer__controller-title">
                        Page Controller
                    </h2>
                    <div className="PortfolioViewer__page-controller">
                        <button className="PortfolioViewer__button icon-left-open-2"
                            onClick={previousPageClicked} />
                        <p className="PortfolioViewer__page-index">
                            {pageIndex} / {pageAmount}
                        </p>
                        <button className="PortfolioViewer__button icon-right-open-2"
                            onClick={nextPageClicked} />
                    </div>
                </section>
            </section>
        </main>
    );
}

export default PortfolioViewer;