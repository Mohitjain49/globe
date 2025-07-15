/**
 * This function reloads the current page.
 */
export function reloadPage() {
    window.location.reload();
}

/**
 * This returns the "blank" route if the visitor is already visiting that route.
 * @param {String | Array<String>} btnRoute The route or routes to navigate to upon clicking the button.
 */
export function getBtnRoute(btnRoute = "/") {
    const route = useRoute();
    if(typeof btnRoute === "string") {
        return ((route.path === btnRoute) ? '/blank' : btnRoute);
    } else {
        return ((-1 != btnRoute.findIndex(item => item === route.path)) ? '/blank' : btnRoute[0]);
    }
}

/**
 * This class manages the page view of the app.
 * It toggles between at least laptop and mobile mode.
 */
export const usePageViewStore = defineStore("PageView", () => {
    /**
     * This reference integer represents the specific view of the app.
     * 0 means that its in laptop mode.
     * 1 means that its in mobile mode.
     */
    const pageView = ref(0);

    /**
     * This function sets the page view of the app.
     */
    function setPageView() {
        const windowWidth = window.innerWidth;
        pageView.value = ((windowWidth > 850) ? 0 : 1);
    }

    /**
     * This function sets the page view event listener.
     */
    function setPageViewEL() {
        setPageView();
        window.addEventListener("resize", setPageView);
    }

    /**
     * This function removes the page view event listener.
     */
    function removePageViewEL() {
        window.removeEventListener("resize", setPageView);
    }

    return { pageView, setPageViewEL, removePageViewEL }
});

export const useScreenStore = defineStore("ScreenStore", () => {
    const faIcon = ref("fa-expand");
    const elementTitle = ref("Full Screen");

    /**
     * This function sets whether the page takes up the whole screen or not.
     */
    function setFullScreen() {
        const appWrapper = document.body;
        const fullScreenInactive = !getFullScreenStatus();

        try {
            if((appWrapper.requestFullscreen != undefined) && fullScreenInactive) {
                appWrapper.requestFullscreen();
            } else if((appWrapper.webkitRequestFullscreen != undefined) && fullScreenInactive) {
                appWrapper.webkitRequestFullscreen();
            } else if((appWrapper.mozRequestFullscreen != undefined) && fullScreenInactive) {
                appWrapper.mozRequestFullscreen();
            } else if((appWrapper.msRequestFullscreen != undefined) && fullScreenInactive) {
                appWrapper.msRequestFullscreen();
            } else if(!fullScreenInactive) {
                document.exitFullscreen();
            }
        } catch(e) {
            console.log(e);
        }
    }

    /**
     * This sets the full screen reference objects.
     */
    function setFullScreenRef() {
        if(getFullScreenStatus()) {
            faIcon.value = "fa-compress";
            elementTitle.value = "Exit Full Screen";
        } else {
            faIcon.value = "fa-expand";
            elementTitle.value = "Full Screen";
        }
    }

    /**
     * This function returns the status of whether or not the app is in full screen mode.
     */
    function getFullScreenStatus() {
        return (document.fullscreenElement != null);
    }

    /**
     * This sets the document event listener for a full screen change.
     */
    function setFullScreenEL() {
        document.addEventListener("fullscreenchange", () => { setFullScreenRef(); });
    }

    /**
     * This removes the document event listener for a full screen change.
     */
    function removeFullScreenEL() {
        document.exitFullscreen().then(() => {
            document.removeEventListener("fullscreenchange", () => { setFullScreenRef(); });
        }).catch(() => {
            document.removeEventListener("fullscreenchange", () => { setFullScreenRef(); });
        });
    }

    return { faIcon, elementTitle,
        setFullScreen, getFullScreenStatus,
        setFullScreenEL, removeFullScreenEL
    }
});

/**
 * This function adds or removes a heartbeat animation to any element.
 */
export function setHeartbeatAnimation(event = new MouseEvent("mouseenter")) {
    if(event.type === "mouseenter") {
        event.target.classList.add('animate__animated', 'animate__heartBeat');
    } else {
        event.target.classList.remove('animate__animated', 'animate__heartBeat');
    }
}

/**
 * This function adds or removes the shakeY animation to any element.
 */
export function setShakeYAnimation(event = new MouseEvent("mouseenter")) {
    if(event.type === "mouseenter") {
        event.target.classList.add('animate__animated', 'animate__shakeY');
    } else {
        event.target.classList.remove('animate__animated', 'animate__shakeY');
    }
}