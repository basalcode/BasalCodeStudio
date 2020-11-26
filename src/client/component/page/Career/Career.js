/* module */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

/* component */
import PortfolioViewer from './PortfolioViewer/PortfolioViewer';
import Resume from './Resume/Resume';
import NotFound from 'component/page/NotFound/NotFound';

const Career = () => {
    return (
        <section className="Career">
            <Switch>
                <Route path='/career/resume' component={Resume} />
                <Route path='/career/portfolio' component={PortfolioViewer} />
                <Route component={NotFound} />
            </Switch>
        </section>
    );
}

export default Career;