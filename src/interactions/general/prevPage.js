export default function prevtPage({ editorAppState }) {
    return async () => {
        const currentPage = editorAppState.getState('currentPage');
        const loadPdfToCanvas = editorAppState.getState('loadPdfToCanvas');
        if (currentPage > 1) {
            const newCurrentPage = currentPage - 1;
            editorAppState.setState('currentPage', newCurrentPage);
            return await loadPdfToCanvas({pageNumber: newCurrentPage});
        }
        return false;
    }
}