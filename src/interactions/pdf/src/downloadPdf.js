// Canvas sizes
const canvasSizingFormat = {
    a4: {
        mm: {
            width: 210,
            height: 297
        },
        dpi: {
            '96': {
                width: 795,
                height: 1123
            },
            '72': {
                width: 595,
                height: 842
            }
        }
    },
    a3: {
        mm: {
            width: 297,
            height: 420
        },
        dpi: {
            '96': {
                width: 1123,
                height: 1587
            },
            '72': {
                width: 842,
                height: 1191
            }
        }
    },
    letter: {
        mm: {
            width: 215.9,
            height: 279.4
        },
        dpi: {
            '96': {
                width: 2070,
                height: 2680
            },
            '72': {
                width: 612,
                height: 792
            }
        }
    },
    legal: {
        mm: {
            width: 215.9,
            height: 355.6
        },
        dpi: {
            '96': {
                width: 2070,
                height: 3413
            },
            '72': {
                width: 612,
                height: 1008
            }
        }
    }
};


export default function downloadPdf({
    editorAppState,
    cleanFormatting,
    jsPDF,
    revertFormatting
}) {
    return async (event) => {
        try {

            // get the canvas
            const canvas = editorAppState.getState('canvas');

            // change background color to white for pdf
            await cleanFormatting({ editorAppState });
    
            // dimensions helpers
            const formatPxToMM = (measurement, dpi) => {
                    const defaultDPI = 96;
                    const useDPI = dpi || defaultDPI;
                    return ((measurement/useDPI)*25.4);
            };
    
            const getPxFromFormat = (format, dpi) => {
                return canvasSizingFormat[format].dpi[dpi];
            }; 


            // extract the correspondng dimension ie: a4
            const { width:clientWidth, height:clientHeight } = getPxFromFormat('a4', '96');

            
             // Create PDF tool
             const pdf =  new jsPDF({
                unit: 'mm',
                //orientation: 'portrait',
                format: 'a4', //[clientWidth, clientHeight]//'a4'//[800, 1100]
            });

            pdf.setProperties({
                creator: 'Creator Name', // The creator or author of the PDF
            });

            // calculate px to mm
            const widthInMM = formatPxToMM(clientWidth, 96);
            const heightinMM = formatPxToMM(clientHeight, 96);

            // create dataURL
            const { canvas:canvasElement } = canvas;
            const canvasDataURL = canvasElement.toDataURL({ format: 'png', multiplier: 1 });
            // add it to pdf
            pdf.addImage(canvasDataURL, 'PNG', 0, 0, widthInMM, heightinMM);
    
            // revert background color from white for pdf
            await revertFormatting({ editorAppState });
    
            // Save PDF
            pdf.save('canvas.pdf'); 
           
        } catch(err) {
            console.log('error upload: ', err);
        }
    }
}

