/* module */
import React from 'react';

/* component */
import ScrollDisplay from 'component/common/ScrollDisplay';
import ResumeHeader from './ResumeHeader';
import ResumeMain from './ResumeMain';
import ResumeFooter from './ResumeFooter';

const Resume = () => {
    return (
        <div className="Resume">
            <ScrollDisplay />
            <ResumeHeader />
            <ResumeMain />
            <ResumeFooter />
        </div>
    );
}

export default Resume;