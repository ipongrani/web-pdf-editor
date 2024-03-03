//const loadToCanvas = require('./loadPdfToCanvas');

export default function uploadPdf({ editorAppState }) {

    const loadPdfToCanvas = editorAppState.getState('loadPdfToCanvas');

    return async (event) => {
        try {
            const file = event.target.files[0];
            //appState.editorAppCanvas.recentlyUploaded.push(file);
            return await loadPdfToCanvas({ file });
        } catch(err) {
            console.log('error upload: ', err);
        }
    }
}

