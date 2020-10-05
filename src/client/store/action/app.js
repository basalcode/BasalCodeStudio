/* constant */
export const NIGHT_MODE = 'NIGHT_MODE';

export const nightMode = (nightModeOn) => {
    return {
        type: NIGHT_MODE,
        nightModeOn: nightModeOn
    };
}