/* module */
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

/* asset */
import portfolio from '~/../../.private/file/portfolio/portfolio.pdf'

const PortfolioFile = () => {
    /* state */
    const [pageAmount, setPageAmount] = useState(null);
    const [pageIndex, setPageIndex] = useState(1);

    /* event handler */
    const onDocumentLoadSuccess = ({ numPages }) => {
        setPageAmount(numPages);
    }

    return (
        <Document className="PortfolioFile"
            file={portfolio}
            onLoadSuccess={onDocumentLoadSuccess}>
            <Page className="PortfolioFile__page"
                pageNumber={pageIndex} />
        </Document>
    );
}

export default PortfolioFile;