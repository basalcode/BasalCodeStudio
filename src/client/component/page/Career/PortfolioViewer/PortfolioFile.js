/* module */
import React from 'react';
import { Document, Page } from 'react-pdf';

/* file */
import portfolio from '~/../../.private/file/portfolio/portfolio.pdf'

const PortfolioFile = (props) => {
    /* props */
    const pageIndex = props.pageIndex;

    /* event handler */
    const onDocumentLoadSuccess = ({ numPages }) => {
        props.onLoad(numPages);
    }

    return (
        <Document className="PortfolioFile"
            file={portfolio}
            renderMode="svg"
            onLoadSuccess={onDocumentLoadSuccess}>
            <Page className="PortfolioFile__page"
                pageNumber={pageIndex} />
        </Document>
    );
}

export default PortfolioFile;