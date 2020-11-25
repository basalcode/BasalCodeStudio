/* module */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/* lib */
import scrollPage from 'lib/scroll/scrollPage'

/* store */
import { lobbyPage as lobbyPageAction } from 'store/action/blog';

/* component */
import ImageDisplay from 'component/common/ImageDispaly';
import BlogLobbyIntro from './BlogLobbyIntro';
import BlogLobbyAbout from './BlogLobbyAbout';
import BlogLobbySkills from './BlogLobbySkills';
import BlogLobbyContact from './BlogLobbyContact';

const BlogLobby = () => {
    /* store */
    const dispatch = useDispatch();
    const appElement = useSelector(store => store.app.appElement, []);
    const pageIndex = useSelector(store => store.blog.index, []);

    /* state */
    const [skillsPageSelected, setSkillsPageSelected] = useState(false);

    /* constant */
    const location = 'BlogLobby';

    /* variable */
    let indexCounter = 0;

    /* event hadler */
    const onSelect = isSelected => {
        setSkillsPageSelected(isSelected);
    }

    /* useEffect */
    // set page scroll in height unit
    useEffect(() => {
        if (appElement) {
            scrollPage.addEvent(
                appElement,
                {
                    scrollStart: (pageIndex, scrollLock) => {
                        dispatch(lobbyPageAction(scrollPage, pageIndex, scrollLock));
                    },
                    scrollFinish: (pageIndex, scrollLock) => {
                        dispatch(lobbyPageAction(scrollPage, pageIndex, scrollLock));
                    }
                }
            );
            
            dispatch(lobbyPageAction(scrollPage, 0, false));
        }
        return () => {
            if (appElement) {
                scrollPage.removeEvent(appElement)
            }
        }
    }, [appElement]);

    // viewport size change
    useEffect(() => {
        const resizeEvent = event => {
            scrollPage.moveScroll(pageIndex);
        }
        window.addEventListener('resize', resizeEvent, false);

        return () => {
            window.removeEventListener('resize', resizeEvent);
        }
    });

    return (
        <section className="BlogLobby">
            <ImageDisplay 
                location={location} 
                activated={!skillsPageSelected} />
            <BlogLobbyIntro index={indexCounter++} />
            <BlogLobbyAbout index={indexCounter++} />
            <BlogLobbySkills index={indexCounter++} onSelect={onSelect} />
            <BlogLobbyContact index={indexCounter++} />
        </section>
    );
}

export default BlogLobby;