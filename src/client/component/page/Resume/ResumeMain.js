/* module */
import React from 'react';

/* text */
import text from '~/../../.private/text/page/resume/resume';

const ResumeMain = () => {
    /* constant */
    const projects = text.ResumeMain.project;

    const licences = text.ResumeMain.licences;
    const experiences = text.ResumeMain.experiences;
    const details = text.ResumeMain.details;

    return (
        <main className="ResumeMain">
            <section className="ResumeMain__projects">
                <h1 className="ResumeMain__section-title">Project expirence</h1>
                {projects.map((project, index) => {
                    const addressArray = project.address;

                    const introduction = project.content.Introduction;
                    const feature = project.content.Feature;
                    const techStack = project.content.TechStack;

                    return (
                        <div className="ResumeMain__project" key={index}>
                            {/* project */}
                            <h2 className="ResumeMain__project-title">{project.title}</h2>
                            {addressArray.map((address, index) =>
                                <div className="ResumeMain__project-address" key={index}>
                                    {address.title} :
                                <a className="ResumeMain__project-link"
                                        href={address.link}>
                                        {address.link}
                                    </a>
                                </div>
                            )}

                            {/* project introduction */}
                            <h2 className="ResumeMain__project-introduction-title">
                                {introduction.title}
                            </h2>
                            {introduction.description.map((description, index) =>
                                <div className="ResumeMain__project-introduction-description"
                                    key={index}>
                                    {description}
                                </div>
                            )}

                            {/* project feature */}
                            <h2 className="ResumeMain__project-feature-title">
                                {feature.title}
                            </h2>
                            {feature.content.map((content, index) =>
                                <div className="ResumeMain__project-feature-content" key={index}>
                                    <h3 className="ResumeMain__project-feature-subtitle">
                                        {content.subtitle}
                                    </h3>
                                    {content.description.map((description, index) =>
                                        <div className="ResumeMain__project-feature-dsecription" key={index}>
                                            {description}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* project tech stack */}
                            <h2 className="ResumeMain__project-tech-title">
                                {techStack.title}
                            </h2>
                            {techStack.description.map((description, index) =>
                                <div className="ResumeMain__project-tech-description"
                                    key={index}>
                                    {description}
                                </div>
                            )}
                        </div>
                    )
                })}
            </section>
            <section className="ResumeMain__other-expirence">
                <h1 className="ResumeMain__section-title">Expirence</h1>
                <div>
                    {experiences.map((experience, index) => 
                        <div key={index}>
                            <div>
                                <h2>{experience.title}</h2>
                                <div>{experience.type}</div>
                                <div>{experience.date}</div>
                            </div>
                            <div>
                                <div>{experience.description}</div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
            <section className="ResumeMain__licence">
                <h1 className="ResumeMain__section-title">Licences</h1>
                {licences.map((licence, index) => 
                    <div key={index}>
                        <h2>{licence.title}</h2>
                        <div>{licence.date}</div>
                        <div>{licence.grade}</div>
                    </div>
                )}
            </section>
            <section className="ResumeMain__details">
                <h1 className="ResumeMain__section-title">Details</h1>
                <ol>
                    {Object.keys(details).map((categoryName, index) =>
                        <div key={index}>
                            <li>{categoryName}</li>
                            <ul>
                                {Object.values(details[categoryName]).map((detailItem, index) =>
                                    <li key={index}>{detailItem}</li>
                                )}
                            </ul>
                        </div>
                    )}
                </ol>
            </section>
        </main>
    );
}

export default ResumeMain;