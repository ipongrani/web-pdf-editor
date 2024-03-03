export default function nexttPage({ editorAppState }) {
    return async () => {
        const currentPage = editorAppState.getState('currentPage');
        const totalPages = editorAppState.getState('totalPages');
        const loadPdfToCanvas = editorAppState.getState('loadPdfToCanvas');
        if (currentPage < totalPages) {
            const newCurrentPage = currentPage + 1;
            editorAppState.setState('currentPage', newCurrentPage);
            return await loadPdfToCanvas({pageNumber: newCurrentPage});
        }
        return false;
    }
}