import { defineStore } from "pinia";
import { ref } from "vue";

import { MAIN_WEBSITE } from "../routes.js";

/**
 * This function navigates visitors to my main website.
 */
export function goToMainWebsite() {
    window.open(MAIN_WEBSITE, "mohit-website");
}

/**
 * This function reloads the current page.
 */
export function reloadPage() {
    window.location.reload();
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
})

export const useDateStore = defineStore("DateStore", () => {
    const dateObj = ref({
        day: -1,
        month: -1,
        year: -1,
        hour: -1,
        minute: -1,
        second: -1,
        meridian: "",
    });
    const dateStrings = ref({
        daySection: "Loading...",
        timeSection: "Loading...",
        timeSectionWithSec: "Loading..."
    })

    var dateInterval = null;

    /**
     * This sets the date object and date strings.
     */
    function setDateObj() {
        const dateNow = new Date();
        const newDateObj = {
            day: dateNow.getDate(),
            month: (dateNow.getMonth() + 1),
            year: dateNow.getFullYear(),
            hour: ((dateNow.getHours() % 12 == 0) ? 12 : (dateNow.getHours() % 12)),
            minute: (dateNow.getMinutes()),
            second: (dateNow.getSeconds()),
            meridian: (dateNow.getHours() >= 12 ? "PM" : "AM")
        }
        dateObj.value = newDateObj;

        const minuteNum = ((newDateObj.minute < 10) ? String('0' + newDateObj.minute) : newDateObj.minute);
        const secondNum = ((newDateObj.second < 10) ? String('0' + newDateObj.second) : newDateObj.second);

        dateStrings.value.daySection = String(newDateObj.month + "/" + newDateObj.day + "/" + newDateObj.year);
        dateStrings.value.timeSection = String(newDateObj.hour + ":" + minuteNum + " " + newDateObj.meridian);
        dateStrings.value.timeSectionWithSec = String(newDateObj.hour + ":" + minuteNum + ":" + secondNum + " " + newDateObj.meridian);
    }

    /**
     * This function starts the date interval.
     */
    function startDateInterval() {
        if(dateInterval != null) { return; }
        dateInterval = setInterval(() => {
            setDateObj();
        }, 1000);
    }

    /**
     * This function stops the date interval.
     */
    function stopDateInterval() {
        if(dateInterval != null) { return; }
        clearInterval(dateInterval);
        dateInterval = null;
    }

    return { dateObj, dateStrings,
        setDateObj, startDateInterval, stopDateInterval
    }
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
 * This class handles event listeners and certain objects that let the app run as a Progressive Web App (PWA).
 * Only useful for when the user is on Google Chrome, Microsoft Edge, or Opera.
 */
export const usePWAStore = defineStore("pwa-store", () => {
    const elMounted = ref(false);
    const statement = ref("Open App As PWA");
    const showOpt = ref(false);

    const pwaCreated = ref(false);
    const pwaOpen = ref(false);
    const deferredPrompt = ref(null);

    /**
     * This function mounts the class's event listeners.
     */
    function mountInstallHandler() {
        if(!elMounted.value) {
            setInstallPromptEL();
            setAppInstalledEL();
            elMounted.value = true;
        }

        checkPWAOpen();
        handleInstallDisplay();
    }

    /**
     * Handles installation or opening the app if already installed.
     */
    function installApp() {
        if(pwaOpen.value) {
            console.log('App is currently running as a PWA, opening the web version...');
            window.open(window.location.origin, '_blank');
        } else if(deferredPrompt.value != null) {
            deferredPrompt.value.prompt();
            deferredPrompt.value.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                deferredPrompt.value = null;
            });
        } else {
            console.log('App is already installed, opening...');
        }
    }

    /**
     * This sets whether or not the globe is open as a PWA or not.
     */
    function checkPWAOpen() {
        pwaOpen.value = (window.matchMedia('(display-mode: standalone)').matches || pwaCreated.value);
    }

    /**
     * This sets up the "beforeInstallPrompt" event. This cannot be removed.
     */
    function setInstallPromptEL() {
        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            deferredPrompt.value = e;
            handleInstallDisplay();
        });
    }

    /**
     * This sets up the "appInstalled" event. This cannot be removed.
     */
    function setAppInstalledEL() {
        window.addEventListener('appinstalled', () => {
            pwaCreated.value = true;
            handleInstallDisplay();
        });
    }

    /**
     * This handles the install display.
     */
    function handleInstallDisplay() {
        if(pwaOpen.value) {
            statement.value = "Open App On Browser";
            showOpt.value = true;
        } else if(pwaOpen.value) {
            statement.value = "Open App As PWA";
            showOpt.value = false;
        } else if(pwaOpen.value) {
            statement.value = "Install App As PWA";
            showOpt.value = true;
        } else {
            showOpt.value = false;
        }
    }

    return { mountInstallHandler, installApp, statement, showOpt }
});