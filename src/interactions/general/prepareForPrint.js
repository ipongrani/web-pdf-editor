export default function prepareForPrint() {
    return {
        cleanFormatting: async function({ editorAppState }) {
            try {
                // get pages
                const pages = editorAppState.getState('pages');

                for (const page of pages) {
                    const textboxes = page['textbox'];
                    const erasers = page['eraser'];
    
                    for(const txtBox of textboxes ) {
                        txtBox.set({ backgroundColor: 'rgba(0, 0, 0, 0)' });
                    }
            
                    for(const eraser of erasers ) {
                        eraser.set({ strokeWidth: 0 });
                    }
                };

               return true;
            } catch(err) {
                console.log('error upload: ', err);
            }
        },
        revertFormatting: async function({ editorAppState }) {
            try {
                 // get pages
                 const pages = editorAppState.getState('pages');

                 for (const page of pages) {
                     const textboxes = page['textbox'];
                     const erasers = page['eraser'];
     
                     for(const txtBox of textboxes ) {
                        txtBox.set({ backgroundColor: 'rgb(211, 223, 237)' });
                     }
             
                     for(const eraser of erasers ) {
                        eraser.set({ strokeWidth: 1 });
                     }
                 };

                return true;
            } catch(err) {
                console.log('error upload: ', err);
            }
        }
    };
}