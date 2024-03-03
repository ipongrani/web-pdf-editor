const { fabric } = require('fabric');

export default async function createFabricCanvas({ htmlElement }) {
    try {
        const canvas = new fabric.Canvas(htmlElement.htmlCanvasElement, {
            backgroundColor: 'white'
        });

        
        return {
            canvas,
            getEditorDimensions: function() {
                const clientWidth = htmlElement.mainContainer.clientWidth;
                const clientHeight = htmlElement.mainContainer.clientHeight;
                return {
                    clientWidth,
                    clientHeight
                }
            },
            setCanvasDimensions: function(width, height) {
                const clientWidth = htmlElement.mainContainer.clientWidth;
                const clientHeight = htmlElement.mainContainer.clientHeight;
                const useWidth = width || clientWidth;
                const useHeight = height || clientHeight;
                // set container dimensions
                htmlElement.mainContainer.style.width = `${useWidth}px`;
                htmlElement.mainContainer.style.height = `${useHeight}px`;
                // set canvas dimensions
                htmlElement.htmlCanvasElement.style.width = `${useWidth}px`;
                htmlElement.htmlCanvasElement.style.height = `${useHeight}px`;
                
                this.canvas.setDimensions({
                    width: useWidth,
                    height: useHeight
                });
                this.canvas.requestRenderAll();
            }
        };
    } catch(err) {
        console.log('err: ', err);
        return false;
    }
};
