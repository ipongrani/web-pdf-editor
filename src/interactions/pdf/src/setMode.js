export default function setMode({ editorAppState, editMode }) {
    return () => {
        // set mode
        editorAppState.setState('editMode', editMode);
        const htmlElement = editorAppState.getState('htmlElement');
        let pageBorder = htmlElement.htmlCanvasElement;
        pageBorder.style.border = '3px solid blue';
    }
}