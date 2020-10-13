/* constant */
export const LOBBY_PAGE = 'LOBBY_PAGE';

export const lobbyPage = (index, scrollOn) => {
    return {
        type: LOBBY_PAGE,
        index: index,
        scrollOn: scrollOn
    };
}