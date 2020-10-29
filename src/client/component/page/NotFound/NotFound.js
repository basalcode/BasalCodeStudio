/* module */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
    const history = useHistory();
    const path = history.location.pathname 

    useEffect(() => {
        /* handle client request to api server */
        /* fetch(path)
        .then(response => response.json())
        .then(parsed => {
            if (parsed.validity) {
                window.close();
            }
        }); */
    }, [])

    return (
        <div className="NotFound">
            404 NOT FOUND.
        </div>
    )
}

export default NotFound;