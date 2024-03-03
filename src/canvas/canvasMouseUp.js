export default function canvasMouseUp({ editorAppState, canvasObjects }) {

    return async (event) => {
        try {
            const updateCanvasView = editorAppState.getState('updateCanvasView');
            const mouse = editorAppState.getState('mouse');
            const  {
                startX,
                startY,
                uWidth,
                uHeight
            } = mouse;
            const accumulatedScaleFactor = editorAppState.getState('accumulatedScaleFactor');
            const editMode = editorAppState.getState('editMode');

            const createElements = [
                'newTextBox',
                'newCorrection',
                'newEraser'
            ];

            const isCreateNewElement = createElements.includes(editMode);

            if (isCreateNewElement) {

                // extract object to create
                const elementToCreate = canvasObjects[editMode] || null;
                const currentPage = editorAppState.getState('currentPage');
                if (elementToCreate) {
                    const createElements = [];
                    const createElement = await elementToCreate({
                        startX,
                        startY,
                        uWidth,
                        uHeight,
                        scaleFactor: accumulatedScaleFactor
                    });
                    createElements.push(createElement);
             
                    
                    // extract the name
                    const objectLocationName = editMode.replace('new', '').toLowerCase();
                    // get state pages
                    const pages = editorAppState.getState('pages');
                    // create new pages
                    const newWorkingPages = pages.reduce((prevVal, currentVal) => {
                        if (currentVal.page === currentPage) {
                            const currentObjects = currentVal[objectLocationName];
                            const newObjects = [...currentObjects, ...createElements];
                            const newWorkingPage = {
                                ...currentVal,
                                [objectLocationName]: newObjects
                            };
                            // return with new page
                            return [
                                ...prevVal,
                                newWorkingPage
                            ]
                        }
                        // return pages without changes
                        return  [
                            ...prevVal,
                            currentVal
                        ];
                    }, []);

                    // set to app State
                    editorAppState.setState('pages', newWorkingPages);
                    
                    return await updateCanvasView({currentPage, createElement: objectLocationName});
                }
            }

          
            // set mouse to false
            mouse.isDragging = false;

            return true;
        } catch(err) {
            console.log('err: ', err);
            return null;
        }
    }
}

