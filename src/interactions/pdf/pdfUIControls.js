

// get control set
export default function pdfUIControls({ requiredElements }) {
    return async (editorCtrlSet) => {
        try {
            const { editModes: { pdf} } = requiredElements;
            const controlSet = {
                'pdf': {
                    downloadPdfButton: {
                        name: 'downloadPdfButton',
                        element: document.querySelector(pdf.downloadPdfButton),
                        action: 'click'
                    },
                    uploadPdfButton: {
                        name: 'uploadPdfButton',
                        element: document.querySelector(pdf.uploadPdfButton),
                        action: 'change'
                    },
                    addEraserButton: {
                        name: 'addEraserButton',
                        element: document.querySelector(pdf.addNewEraserButton),
                        action: 'click'
                    },
                    addCorrectionsButton: {
                        name: 'addCorrectionsButton',
                        element: document.querySelector(pdf.addNewCorrectionsButton),
                        action: 'click'
                    },
                    addTextBoxButton: {
                        name: 'addTextBoxButton',
                        element: document.querySelector(pdf.addNewTextBoxButton),
                        action: 'click'
                    },
                    zoomInButton: {
                        name: 'zoomInButton',
                        element: document.querySelector(pdf.zoomInButton),
                        action: 'click'
                    },
                    zoomOutButton: {
                        name: 'zoomOutButton',
                        element: document.querySelector(pdf.zoomOutButton),
                        action: 'click'
                    },
                    nextPageButton: {
                        name: 'nextPageButton',
                        element: document.querySelector(pdf.nextPageButton),
                        action: 'click'
                    },
                    prevPageButton: {
                        name: 'prevPageButton',
                        element: document.querySelector(pdf.prevPageButton),
                        action: 'click'
                    },
                }
            };
            const selectedControlSet = controlSet[editorCtrlSet];
            const currentControls = Object.keys(selectedControlSet);
            // check if all controls are available
            for (const ctrl of currentControls) {
                const extractedControlSet = selectedControlSet[ctrl]
                const controlIsAvailable = extractedControlSet.element;
                if(!controlIsAvailable) {
                    const err = `Incomplete control elements: ${ctrl}`
                    throw new Error(err);
                }
            }
            return selectedControlSet
        } catch(err) {
            console.log('err: ', err);
            return false;
        }
    }
}

