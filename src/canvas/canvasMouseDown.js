export default function canvasMouseDown({ editorAppState }) {
    return async (event) => {
        const mouse = editorAppState.getState('mouse');
        const { canvas } = editorAppState.getState('canvas');;
        mouse.isDragging = true;
        const pointer = canvas.getPointer(event.e);
        mouse.startX = pointer.x;
        mouse.startY = pointer.y;
    };
}