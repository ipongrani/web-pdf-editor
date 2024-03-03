/** @license =============================================================
*
* Copyright (c) 2024 Rani Ipong, https://github.com/ipongrani
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
* ========================================================================
*/



import createFabricCanvas from './src/newEditor/createFabricCanvas';
import canvasMouseDown from './src/canvas/canvasMouseDown';
import canvasMouseMove from './src/canvas/canvasMouseMove';
import canvasMouseUp from './src/canvas/canvasMouseUp';
import updateCanvas from './src/canvas/updateCanvas';
import newTextBox from './src/interactions/objects/textBox';
import newCorrection from './src/interactions/objects/corrections';
import newEraser from './src/interactions/objects/eraser';
import appState from './src/appState/index';
import loadInteractions from './src/interactions/interactions';



export default function pageEditor (requiredElements) {
    return (async () => {
        try {
            // guard
            if (!requiredElements) throw new Error('Missing requiredElements ids.');
            
            // Add HTML To the Page
            const createHtmlElements = () => {
                const canvasPageBorder = document.createElement('div');
                const htmlCanvasElement = document.createElement('canvas');
                const mainContainer = document.querySelector(requiredElements.mainCanvasContainer);
                canvasPageBorder.appendChild(htmlCanvasElement);
                mainContainer.appendChild(canvasPageBorder);

                return {
                    mainContainer,
                    canvasPageBorder,
                    htmlCanvasElement
                }
            }

           
            // html object
            const htmlElement = createHtmlElements();


            // create canvas objects map
            const canvasObjects = {
                newTextBox,
                newCorrection,
                newEraser
            };

            // instantiate the state
            const editorAppState = appState();
            const fabricCanvas = await createFabricCanvas({ htmlElement });

            // set require elements to appState
            editorAppState.setState('requiredElements', requiredElements);

            // canvas dimensions
            const { clientWidth, clientHeight } = fabricCanvas.getEditorDimensions();
            fabricCanvas.setCanvasDimensions(clientWidth, clientHeight);

            // set canvas to state including the created html
            editorAppState.setState('canvas', fabricCanvas);
            editorAppState.setState('htmlElement', htmlElement);


            // create canvas updater and save it to state
            const updateCanvasView = updateCanvas({ editorAppState });
            editorAppState.setState('updateCanvasView', updateCanvasView);


            // mouseDown handler
            const mouseDownHandler = canvasMouseDown({ editorAppState });
            fabricCanvas.canvas.on('mouse:down', mouseDownHandler);

            // mouseMove handler
            const mouseMoveHandler = canvasMouseMove({ editorAppState });
            fabricCanvas.canvas.on('mouse:move', mouseMoveHandler);

            // mouseUp handler
            const mouseUpHandler = canvasMouseUp({
                editorAppState,
                canvasObjects
            });
            fabricCanvas.canvas.on('mouse:up', mouseUpHandler);

            // interactions
            const loadCurrentEditorMode = await loadInteractions({ editorAppState });
            await loadCurrentEditorMode('pdf');

 
            return true;
        } catch(err) {
            console.log('error starting editor app: ', err);
            return false;
        }
    })();
}

(function() {
    if (window) {
        console.log('Module pageEditor loaded to window');
        window.pageEditor = pageEditor;
    }
})()

