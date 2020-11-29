/* module */
import React, { useEffect } from 'react';

/* text */
import text from '~/../../.private/text/page/career/resume/resume';

const ResumeFooter = () => {
    /* constant */
    const footerContact = text.ResumeFooter.contact;
    const footerMessage = text.ResumeFooter.message;

    /* useEffect */
    useEffect(() => {

    }, [])

    return (
        <footer className="ResumeFooter">
            <h1 className="ResumeFooter__title">Contact</h1>
            <nav className="ResumeFooter__navigation">
                <table className="ResumeFooter__table">
                    <thead className="ResumeFooter__table-head">
                        <tr className="ResumeFooter__table-tr">
                            <th className="ResumeFooter__table-th">
                                <div className="ResumeFooter__table-icon icon-mail-1"></div>
                            </th>
                            <th className="ResumeFooter__table-th">
                                <div className="ResumeFooter__table-icon icon-github-1"></div>
                            </th>
                            <th className="ResumeFooter__table-th">
                                <div className="ResumeFooter__table-icon icon-home"></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="ResumeFooter__table-body">
                        <tr className="ResumeFooter__table-tr">
                            <td className="ResumeFooter__table-td">
                                <a className="ResumeFooter__table-link"
                                href={'mailto:' + footerContact.email}>{footerContact.email}</a>
                            </td>
                            <td className="ResumeFooter__table-td">
                                <a className="ResumeFooter__table-link"
                                href={footerContact.github}>{footerContact.github}</a>
                            </td>
                            <td className="ResumeFooter__table-td">
                                <a className="ResumeFooter__table-link"
                                    href={footerContact.blog}>{footerContact.blog}</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </nav>
            <section className="ResumeFooter__section">
                <p className="ResumeFooter__message">
                    {footerMessage}
                </p>
            </section>
        </footer>
    );
}

export default ResumeFooter;