export default function zoomOut({ editorAppState, updateCanvasView }) {
    return async (event) => {
        try {
            const zoomCount = editorAppState.getState('zoomCount');
            const accumulatedZoom = editorAppState.getState('accumulatedZoom');
            const accumulatedScaleFactor = editorAppState.getState('accumulatedScaleFactor');
            if (zoomCount > 1) {
                const newCount = zoomCount - 1;
                editorAppState.setState('zoomCount', newCount);
                const newAccumulatedZoom = accumulatedZoom / 1.1;  // Accumulate zoom level by multiplying
                editorAppState.setState('accumulatedZoom', newAccumulatedZoom);
                const newAccumulatedScaleFactor = accumulatedScaleFactor / 1.1;
                editorAppState.setState('accumulatedScaleFactor', newAccumulatedScaleFactor);
                return await updateCanvasView();
            }
        } catch(err) {
            console.log('error upload: ', err);
            return null;
        }
    }
}