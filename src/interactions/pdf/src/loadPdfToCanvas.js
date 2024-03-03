export default function loadToCanvas({
    editorAppState,
}) {
    return async ({ file, pageNumber }) => {
        try {
            // sclaefactor
            const accumulatedScaleFactor = editorAppState.getState('accumulatedScaleFactor');

            // extract required element
            const requiredElements = editorAppState.getState('requiredElements');

            // fabric canvas
            const canvas = editorAppState.getState('canvas');

            // render
            const updateCanvasView = editorAppState.getState('updateCanvasView');

            
            // if no file or page number then return
            if (!file && !pageNumber) return null;
            
            if (file) {
                // reset pages
                editorAppState.setState('pages', []);
                const reader = new FileReader();
                reader.onload = async function(event) {
                    // extract the result
                    const { result } = event.target;

                    // get pdfjs
                    const pdfjslib = editorAppState.getState('pdfjslib');

                    // set worker
                    pdfjslib.GlobalWorkerOptions.workerSrc = requiredElements.workerSrc;
                    const { getDocument } = pdfjslib;
                    
                    // extract the pdf
                    const typedarray = new Uint8Array(result);
                    const pdf = await getDocument(typedarray).promise;

                    // get num of pages
                    const numPages = pdf.numPages;
                    

                    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
                        // get uploadContext from state
                        const statePages = editorAppState.getState('pages');
                        const page = await pdf.getPage(pageNumber);
                        const viewport = page.getViewport({ scale: 1.35 });
                        
                      
                        const useWidth = viewport.width;
                        const useHeight = viewport.height;
                        
                        // Create a canvas element to render the page
                        const canvasElement = document.createElement('canvas');
                        canvasElement.width = useWidth;
                        canvasElement.height = useHeight;

                        // Get the context
                        const context = canvasElement.getContext('2d');
                        canvas.setCanvasDimensions(useWidth, useHeight);
                       
                        // create the render context
                        const renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        };

                        // render the page
                        await page.render(renderContext).promise;
                        // convert the temporary canvas to fabric element
                        const imageData = canvasElement.toDataURL();

                        // Create a promise for loading the image
                        const loadImage = () => new Promise(resolve => {
                            fabric.Image.fromURL(imageData, img => {
                                // Resolve the promise with the loaded image
                                resolve(img);
                            });
                        });

                        // load the image
                        const img = await loadImage();
                        
                        // set as immovable and add id
                        img.set({ selectable: false, evented: false, id: 'uploaded-pdf-page' });
                        const newUploadedContext = {
                            page: pageNumber,
                            uploaded: img,
                            textbox: [],
                            eraser: [],
                            correction: [],
                        };
                        const newStatePages = [
                            ...statePages,
                            newUploadedContext
                        ];
                        editorAppState.setState('pages', newStatePages);
                        // The code below is not necessary but used for visual effects.
                        // The pages are loaded one at a time and at the end of this,
                        // it will set the latest page
                        //const { canvas:fabricCanvas } = canvas;
                        //fabricCanvas.add(img);
                    }
                    const pages = editorAppState.getState('pages');
                    const lastIndex = pages.length;
                    const firstPage = pages[0];
          
                    editorAppState.setState('totalPages', lastIndex);
                    editorAppState.setState('currentPage', 1);
                    return await updateCanvasView({updatePage: firstPage});
                };
            
                reader.readAsArrayBuffer(file);
            }


            if (pageNumber) {
                const pages = editorAppState.getState('pages');
                const selectedPage = pages.filter((_page) => (_page.page === pageNumber)).pop();
                return await updateCanvasView({updatePage: selectedPage});
            }
           
            return canvas;
        } catch(err) {
            console.log('error loadToCanvas: ', err);
        } 
    }
}