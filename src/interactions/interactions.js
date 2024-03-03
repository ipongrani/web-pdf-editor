import setMode from './pdf/src/setMode';
import zoomIn from './general/zoomIn';
import zoomOut from './general/zoomOut';
import nextPage from './general/nextPage';
import prevPage from './general/prevPage';
import prepareForPrint from './general/prepareForPrint';

import loadToCanvas from './pdf/src/loadPdfToCanvas';
import pdfUIControls from './pdf/pdfUIControls';
import pdfControls from './pdf/pdfFunctionControls';



const jsPDF = require('jspdf').jsPDF;

async function pdfjs () {
    try {
        const pdfjsLib = require('pdfjs-dist');
        if(pdfjsLib) {
            return pdfjsLib;
        } else {
            throw new Error('Unable to load pdfjsLib');
        }
    } catch (err) {
        console.log('err: ', err);
        return false;
    }
}; 


export default async function loadInteractions({ editorAppState }) {
    // pdfJs package
    const pdfjslib = await pdfjs();
    editorAppState.setState('pdfjslib', pdfjslib);
    
    //prepare for print helpers
    const { cleanFormatting, revertFormatting } = prepareForPrint();

    // get the require elements
    const requiredElements = editorAppState.getState('requiredElements');

    // create the updater
    const updateCanvasView = editorAppState.getState('updateCanvasView');

    const controlsUIMap = {
        pdf: pdfUIControls({ requiredElements })
    };

    // pdfToCanvas
    const loadPdfToCanvas = loadToCanvas({ editorAppState });
    editorAppState.setState('loadPdfToCanvas', loadPdfToCanvas)

    const actionFunctionsGeneral = {
        addTextBoxButton: setMode({ editorAppState, editMode: 'newTextBox' }),
        addCorrectionsButton: setMode({ editorAppState, editMode: 'newCorrection' }),
        addEraserButton: setMode({ editorAppState, editMode: 'newEraser' }),
        uploadPdfButton: pdfControls.uploadPdf({ editorAppState }),
        downloadPdfButton: pdfControls.downloadPdf({ editorAppState, cleanFormatting, revertFormatting, jsPDF }),
        zoomInButton: zoomIn({ editorAppState, updateCanvasView }),
        zoomOutButton: zoomOut({ editorAppState, updateCanvasView }),
        nextPageButton: nextPage({ editorAppState }),
        prevPageButton: prevPage({ editorAppState }),
    };


    
    return async (selectMode) => {
        //const userEditModes = requiredElements.editModes;
        //const selectedMode = userEditModes[selectMode];
        const controlsFromMap = controlsUIMap[selectMode];

        if (!controlsFromMap) return false;

        const extractedControls = await controlsFromMap(selectMode);
   
  
        // attach listeners
        for (const ctrl in extractedControls) {
            const control = extractedControls[ctrl];
            const element = control.element;
            const elementAction = control.action;
            const actionName = control.name;
            const listenerHandler = actionFunctionsGeneral[actionName]
            element.addEventListener(elementAction, listenerHandler)
        }
    };
}