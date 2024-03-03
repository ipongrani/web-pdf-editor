
# Web PDF Editor

Please note that this project mimics and achieves PDF manipulation via converting the PDF into PNG images and stack up layers into the web canvas to provide page modificication effects. It can then be downloaded back to PDF file format.

The texts may not necessarily match the original or even the styles and formatting.


### Disclaimer: This is a work in progress and may contain incomplete or faulty features. Please see the license.


Working Sample at: https://f6h444hz19.execute-api.us-east-1.amazonaws.com/newpdf

## To start

You can use the build files under the /dist directory or include it in a script tag.

`<script type="module" src="pageEditor.js"></script>`

You will then need to create the necessary HTML elements as needed and map the Ids of the elements.

## Usage

`pageEditor` accepts an object containing the html element Ids

example:
```
const requiredElements = {
    mainCanvasContainer: '#main-canvas-container',
    editModes: {
        pdf: {
            addNewEraserButton: '#your-element-id',
            addNewCorrectionsButton: '#your-element-id',
            addNewTextBoxButton: '#your-element-id',
            uploadPdfButton:'#your-element-id',
            downloadPdfButton: '#your-element-id',
            zoomOutButton:'#your-element-id',
            zoomInButton: '#your-element-id',
            nextPageButton: '#your-element-id',
            prevPageButton: '#your-element-id',
        }
    },
    workerSrc: 'pageEditor/pdf.worker.min.mjs'
};
```

using it in a script in browser
```
window.addEventListener('load', async () => {
    
    const requiredElements = {
        mainCanvasContainer: '#main-canvas-container',
        editModes: {
            pdf: {
                addNewEraserButton: '#your-element-id',
                addNewCorrectionsButton: '#your-element-id',
                addNewTextBoxButton: '#your-element-id',
                uploadPdfButton:'#your-element-id',
                downloadPdfButton: '#your-element-id',
                zoomOutButton:'#your-element-id',
                zoomInButton: '#your-element-id',
                nextPageButton: '#your-element-id',
                prevPageButton: '#your-element-id',
            }
        },
        workerSrc: 'pageEditor/pdf.worker.min.mjs'
    };

    pageEditor(requiredElements);
}); 
```

## Required Elements

`mainCanvasContainer` The main canvas html element in you webpage.

`editModes` Loads the controls available for selected mode.

`workerSrc` This is a required worker file from pdfJS dependency. Plesse checkout the pdfJS documentation for more details.


## Modes

Each modes require a specific set of elements present in the page to function.

At the moment only the PDF mode is available. The PDF mode requires the user to
have the created HTML element IDs collected in json format and passed as an argument in to the `pageEditor` function.

The PDF mode requires the following:
```
editModes: {
    pdf: {
        addNewEraserButton: '#your-element-id',
        addNewCorrectionsButton: '#your-element-id',
        addNewTextBoxButton: '#your-element-id',
        uploadPdfButton:'#your-element-id',
        downloadPdfButton: '#your-element-id',
        zoomOutButton:'#your-element-id',
        zoomInButton: '#your-element-id',
        nextPageButton: '#your-element-id',
        prevPageButton: '#your-element-id',
    }
}
```
