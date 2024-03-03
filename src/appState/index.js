export default function appState () {
    let appState = {
        canvas: null,
        requiredElements: null,
        htmlElement: null,
        pageBorder: null,
        recentlyUploaded: [],
        controls: null,
        accumulatedZoom: 1.0,
        accumulatedScaleFactor: 1.0,
        zoomCount: 1,
        currentPage: 1,
        totalPages: 1,
        pages: [
            {
                page: 1,
                textbox: [],
                eraser: [],
                correction: [],
            }
        ],
        editMode: null,
        mouse: {
            isDragging: false,
            startX: null,
            startY: null,
            uWidth: null,
            uHeight: null
        },
    };

    function getState(prop) {
        return appState[prop];
    }

    function setState(prop, propVal) {
        appState[prop] = propVal;
        return true;
    }

    return {
        getState,
        setState
    }
}