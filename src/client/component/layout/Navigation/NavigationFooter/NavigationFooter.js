/* module */
import React from 'react';

const NavigationFooter = () => {
    /* constant */
    const githubLink = "https://github.com/basalcode";
    const resumeLink = "https://basalcode.studio/career/resume";
    const emailLink = "basalcode@gmail.com";

    return (
        <footer className="NavigationFooter">
            <section className="NavigationFooter__contact">
                <h2 className="NavigationFooter__contact-header">
                    Contact
                </h2>
                <div className="NavigationFooter__contact-items">
                    <a className="NavigationFooter__contact-item"
                        href={githubLink}
                        target="_blank">
                        <p className="NavigationFooter__contact-text">Github</p>
                    </a>
                    <a className="NavigationFooter__contact-item"
                        href={resumeLink}
                        target="_blank">
                        <p className="NavigationFooter__contact-text">Resume</p>
                    </a>
                    <a className="NavigationFooter__contact-item"
                        href={'mailto:' + emailLink}>
                        <p className="NavigationFooter__contact-text">Email</p>
                    </a>
                    <div className="NavigationFooter__">

                    </div>
                </div>
            </section>
            <p className="NavigationFooter__copyright">
                ⓒ 2020 BasalCodeStudio
            </p>
        </footer>
    );
}

export default NavigationFooter;