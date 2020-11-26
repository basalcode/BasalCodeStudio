/* module */
import React from 'react';

/* component */
import ResumeHeader from './ResumeHeader';
import ResumeMain from './ResumeMain';
import ResumeFooter from './ResumeFooter';

const Resume = () => {
    return (
        <div className="Resume">
            <ResumeHeader />
            <ResumeMain />
            <ResumeFooter />
        </div>
    );
}

export default Resume;