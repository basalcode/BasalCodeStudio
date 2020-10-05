/* constant */
export const LOBBY_PAGE = 'LOBBY_PAGE';

export const lobbyPage = (index) => {
    return {
        type: LOBBY_PAGE,
        index: index
    };
}