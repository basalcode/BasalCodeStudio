/* constant */
export const NIGHT_MODE = 'NIGHT_MODE';
export const APP_ELEMENT = 'APP_ELEMENT';

export const appElement = (appElement) => {
    return {
        type: APP_ELEMENT,
        appElement: appElement
    }
}

export const nightMode = (nightModeOn) => {
    return {
        type: NIGHT_MODE,
        nightModeOn: nightModeOn
    };
}