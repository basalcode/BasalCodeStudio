/* module */
import React from 'react';

/* text */
import text from '~/../../.private/text/page/resume/resume';

const ResumeMain = () => {
    /* constant */
    const skills = text.skills;
    
    return (
        <main className="ResumeMain">
            <section className="ResumeMain__skills">
                <h2>Skills</h2>
                <ol>
                    {Object.keys(skills).map((categoryName, index) =>
                        <div key={index}>
                            <li>{categoryName}</li>
                            <ul>
                                {Object.values(skills[categoryName]).map((skillItem, index) =>
                                    <li key={index}>{skillItem}</li>
                                )}
                            </ul>
                        </div>
                    )}
                </ol>
            </section>
            <section className="ResumeMain__other-expirence">
                
            </section>
            <section className="ResumeMain__licence">
                
            </section>
            
        </main>
    );
}

export default ResumeMain;