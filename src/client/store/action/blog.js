/* constant */
export const LOBBY_PAGE = 'LOBBY_PAGE';
export const NAVIGATION = 'NAVIGATION';

export const lobbyPage = (scroll, index, scrollOn) => {
    return {
        type: LOBBY_PAGE,
        scroll: scroll,
        index: index,
        scrollOn: scrollOn
    };
}

export const navigation = (navigationOn) => {
    return {
        type: NAVIGATION,
        navigationOn: navigationOn    
    }
}