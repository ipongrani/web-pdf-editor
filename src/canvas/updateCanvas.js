export default function updateCanvas({ editorAppState }) {
    return async (updateProps) => {
        try {
            // get the canvas
            const fabricCanvas = editorAppState.getState('canvas');

            // zoom
            const accumulatedZoom = editorAppState.getState('accumulatedZoom');

            //scale factor
            const accumulatedScaleFactor = editorAppState.getState('accumulatedScaleFactor');

            // get pages
            const pages = editorAppState.getState('pages');
           
            // get current dimension
            const { clientWidth, clientHeight } = fabricCanvas.getEditorDimensions();

            // calculate new dimensions
            const newWidth = clientWidth * accumulatedZoom;
            const newHeight = clientHeight * accumulatedZoom;


            // if there is updateProps to create new element
            if (updateProps) {
                const { canvas } = fabricCanvas;
                const {currentPage, createElement} = updateProps;
                // if it is a new element to be created
                if (createElement) {
                    // get the current working page
                    const page = pages.filter((_page) => (_page.page === currentPage)).pop();
                    // get the corresponding element map
                    const workingPage = page[createElement];
                    for(const element of workingPage) {
                        if(element) {
                            canvas.add(element);
                        }
                    }
                }

                const updatePage = updateProps.updatePage;
                // if it is changing pages
                if (updatePage) {
                    // get the uploaded
                    if (updatePage.uploaded) {
                        const uploadedPage = updatePage.uploaded;
                        canvas.clear();
                        canvas.add(uploadedPage);
                        
                        const textboxes = updatePage['textbox'];
                        const erasers = updatePage['eraser'];
                        const corrections = updatePage['correction'];
        
                        // keep textboxes on top
                        for (const textbox of textboxes) {
                            canvas.add(textbox);
                        }
                        // keep eraser on top
                        for (const eraser of erasers) {
                            canvas.add(eraser);
                        }
                        // corrections stay on top
                        for (const correction of corrections) {
                            canvas.add(correction);
                        }
                    }
                }
             }



            // set canvas dimensions 
            fabricCanvas.setCanvasDimensions(newWidth, newHeight);
           
            // sort the z-index and scaling of objects in all pages
            for (const page of pages) {
                const textboxes = page['textbox'];
                const erasers = page['eraser'];
                const corrections = page['correction'];

                if (page.uploaded) {
                    const uploadedPage = page.uploaded;
                    const newScaleX = 1 * accumulatedScaleFactor;
                    const newScaleY = 1 * accumulatedScaleFactor;
                    uploadedPage.set({
                        left: 0,
                        top: 0,
                        scaleX: newScaleX,
                        scaleY: newScaleY,
                    });
                    uploadedPage.sendToBack();
                }

                // keep textboxes on top
                for (const textbox of textboxes) {
                    textbox.set({
                        left: textbox.left * accumulatedZoom,
                        top: textbox.top * accumulatedZoom,
                        scaleX: textbox.scaleX * accumulatedZoom,
                        scaleY: textbox.scaleY * accumulatedZoom,
                    });
                    textbox.bringToFront();
                }
                // keep eraser on top
                for (const eraser of erasers) {
                    eraser.set({
                        left: eraser.left * accumulatedZoom,
                        top: eraser.top * accumulatedZoom,
                        scaleX: eraser.scaleX * accumulatedZoom,
                        scaleY: eraser.scaleY * accumulatedZoom,
                    });
                    eraser.bringToFront();
                }
                // corrections stay on top
                for (const correction of corrections) {
                    correction.set({
                        left: correction.left * accumulatedZoom,
                        top: correction.top * accumulatedZoom,
                        scaleX: correction.scaleX * accumulatedZoom,
                        scaleY: correction.scaleY * accumulatedZoom,
                    });
                    correction.bringToFront();
                }

            };
    

            // refresh canvas
            fabricCanvas.canvas.requestRenderAll();
    
            // reset editMode
            editorAppState.setState('editMode', null);
            
            // reset page borders
            const htmlElement = editorAppState.getState('htmlElement');
            let pageBorder = htmlElement.htmlCanvasElement;
            pageBorder.style.border = 'none';

            // reset accumulatedZoom
            editorAppState.setState('accumulatedZoom', 1.0);

            return fabricCanvas;
        } catch(err) {
            console.log('error upload: ', err);
            return null;
        }
    }
}

