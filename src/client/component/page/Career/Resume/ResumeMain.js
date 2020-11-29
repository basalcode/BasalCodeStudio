/* module */
import React from 'react';

/* text */
import text from '~/../../.private/text/page/career/resume/resume';

const ResumeMain = () => {
    /* constant */
    const projects = text.ResumeMain.project;

    const licences = text.ResumeMain.licences;
    const experiences = text.ResumeMain.experiences;
    const skills = text.ResumeMain.skills;

    return (
        <main className="ResumeMain">
            <article className="ResumeMain__section">
                <h1 className="ResumeMain__section-title">Projects</h1>
                {projects.map((project, index) => {
                    const addressArray = project.address;

                    const introduction = project.content.Introduction;
                    const feature = project.content.Feature;
                    const techStack = project.content.TechStack;

                    return (
                        <article className="ResumeMain__content" key={index}>
                            <header className="ResumeMain__content-header">
                                <h2 className="ResumeMain__content-header-title">
                                    {project.title}
                                </h2>
                                {addressArray.map((address, index) =>
                                    <section className="ResumeMain__project-address"
                                        key={index}>
                                        <div className="ResumeMain__project-address-title">
                                            {address.title}
                                        </div>
                                        <br />
                                        <a className="ResumeMain__project-link"
                                            href={address.link}>
                                            {address.link}
                                        </a>
                                        
                                    </section>
                                )}
                            </header>

                            <section className="ResumeMain__content-body">
                                <section className="ResumeMain__content-body-category">
                                    <h2 className="ResumeMain__content-body-title">
                                        {introduction.title}
                                    </h2>
                                    <ul className="ResumeMain__content-body-description">
                                    {introduction.description.map((description, index) =>
                                        <li key={index}>
                                            {description}
                                        </li>
                                    )}
                                    </ul>
                                </section>

                                <section className="ResumeMain__content-body-category">
                                    <h2 className="ResumeMain__content-body-title">
                                        {feature.title}
                                    </h2>
                                    {feature.content.map((content, index) =>
                                        <div className="ResumeMain__content-body-description-container" key={index}>
                                            <h3 className="ResumeMain__content-body-subtitle">
                                                {content.subtitle}
                                            </h3>
                                            <ul className="ResumeMain__content-body-description">
                                            {content.description.map((description, index) => 
                                                <li key={index}>
                                                    {description}
                                                </li>
                                            )}
                                            </ul>
                                        </div>
                                    )}
                                </section>

                                <section className="ResumeMain__content-body-category">
                                    <h2 className="ResumeMain__content-body-title">
                                        {techStack.title}
                                    </h2>
                                    <ul className="ResumeMain__content-body-description">
                                    {techStack.description.map((description, index) =>
                                        <li key={index}>
                                            {description}
                                        </li>
                                    )}
                                    </ul>
                                </section>
                            </section>
                        </article>
                    )
                })}
            </article>
            <article className="ResumeMain__section">
                <h1 className="ResumeMain__section-title">Experience</h1>
                <section>
                    {experiences.map((experience, index) =>
                        <article className="ResumeMain__content" key={index}>
                            <section className="ResumeMain__content-header">
                                <h2 className="ResumeMain__expirence-title">{experience.title}</h2>
                                <p className="ResumeMain__expirence-type">{experience.type}</p>
                                <p className="ResumeMain__expirence-date">{experience.date}</p>
                            </section>
                            <section className="ResumeMain__content-body">
                                <div className="ResumeMain__description">{experience.description}</div>
                            </section>
                        </article>
                    )}
                </section>
            </article>
            <article className="ResumeMain__section">
                <h1 className="ResumeMain__section-title">Licences</h1>
                <section className="ResumeMain__licence-container">
                    {licences.map((licence, index) =>
                        <article className="ResumeMain__licence" key={index}>
                            <section className="ResumeMain__licence-header">
                                <h2 className="ResumeMain__licence-title">{licence.title}</h2>
                                <div className="ResumeMain__licence-date">{licence.date}</div>
                            </section>
                            <section className="ResumeMain__licence-body">
                                <div className="ResumeMain__licence-grade">{licence.grade}</div>
                            </section>
                        </article>
                    )}
                </section>
            </article>
            <article className="ResumeMain__section">
                <h1 className="ResumeMain__section-title">Skills</h1>
                {skills.map((category, index) =>
                    <section className="ResumeMain__skills-container" key={index}>
                        <h2 className="ResumeMain__skills-subtitle">{category.title}</h2>
                        <ul className="ResumeMain__skills-description-container">
                            {category.description.map((description, index) =>
                                <li className="ResumeMain__skills-description"
                                    key={index}>
                                    {description}
                                </li>
                            )}
                        </ul>
                    </section>
                )}
            </article>
        </main>
    );
}

export default ResumeMain;