import pageEditor from '../index';

test('Should reject when there is incomplete required elements', async () => {
    const requiredElements = {
        mainCanvasContainer: 'some-id',
        editModes: {
            pdf: {
            }
        },
        workerSrc: 'some-path'
    };
    const pageEditorFailed = pageEditor({});

    expect(pageEditorFailed).toBe(false);
});