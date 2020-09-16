import React from 'react';

const FloatingUI = () => {
    useEffect(() => {
        const interval = 1500;
        setTimeout(() => {
            setEffectClassName('');
        }, interval)
    }, []);

    return (
        <div className="FloatingUI">
            <div className="FloatingUI__link-container">
                <a className="GitHubLink__icon icon-github-circled-alt2"></a>
                <a className="EmailLink__icon icon-mail-1"></a>
            </div>
            <div className="FloatingUI__button-container">
                <input type="button"></input>
                <input type="button"></input>
            </div>
        </div>
    );
}

export default FloatingUI;