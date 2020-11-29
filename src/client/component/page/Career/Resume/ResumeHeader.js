/* module */
import React from 'react';

/* text */
import text from '~/../../.private/text/page/career/resume/resume';

const ResumeHeader = () => {
    /* constant */
    const headerTitle = text.ResumeHeader.headerTitle;
    const headerSubtitle = text.ResumeHeader.headerSubtitle;

    return (
        <header className="ResumeHeader">
            <h1 className="ResumeHeader__title">
                {headerTitle.map((titleElement, index) =>
                    <p key={index}>{titleElement}</p>
                )}
            </h1>
            <h2 className="ResumeHeader__subtitle">
                {headerSubtitle.map((subtitleElement, index) =>
                    <p key={index}>{subtitleElement}</p>
                )}
            </h2>
        </header>
    );
}

export default ResumeHeader;