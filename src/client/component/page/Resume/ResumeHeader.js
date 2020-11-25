/* module */
import React from 'react';

/* text */
import text from '~/../../.private/text/page/resume/resume';

const ResumeHeader = () => {
    /* constant */
    const headerTitle = text.ResumeHeader.headerTitle;
    const headerSubtitle = text.ResumeHeader.headerSubtitle
    
    return (
        <header className="ResumeHeader">
            <h1 className="ResumeHeader__title">
                {headerTitle.map((titleElement, index) => 
                    <div key={index}>{titleElement}</div>
                )}
            </h1>
                <h2 className="ResumeHeader__subtitle">
                    {headerSubtitle}
                </h2>
        </header>
    );
}

export default ResumeHeader;