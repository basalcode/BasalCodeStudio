/* constant */
export const PAGE = 'PAGE';

export const page = (index) => {
    return {
        type: PAGE,
        index: index
    };
}