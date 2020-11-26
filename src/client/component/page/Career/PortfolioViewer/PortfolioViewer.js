/* module */
import React, { useEffect } from 'react';

/* component */
import PortFolioFile from './PortfolioFile'

const PortFolioViewer = () => {
    /* useEffect */
    useEffect(() => {

    }, [])

    return (
        <main className="PortFolioViewer">
            <section className="PortFolioViewer__file-container">
                <PortFolioFile />
            </section>
            <section className="PortFolio__control-container">
                <div className="PortFolio__download">

                </div>
                <button className="PortFolio__button" />
                <button className="PortFolio__button" />
            </section>
        </main>
    );
}

export default PortFolioViewer;