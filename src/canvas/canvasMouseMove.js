export default function canvasMouseMove({ editorAppState }) {
    return async (event) => {
        let { canvas } = editorAppState.getState('canvas');
        let mouse = editorAppState.getState('mouse');

        if (mouse.isDragging) {
            const pointer = canvas.getPointer(event.e);
            mouse.uWidth = pointer.x - mouse.startX;
            mouse.uHeight = pointer.y - mouse.startY;
        }
    }
}
