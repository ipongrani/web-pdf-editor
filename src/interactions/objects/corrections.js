export default async function newCorrection({startX, startY, uWidth, uHeight, scaleFactor}) {
    try {
        // Create a Fabric.js textbox object from the textarea
        const correction = new fabric.Textbox('Your new text here...', {
            left: startX,
            top: startY,
            width: uWidth,
            height: uHeight,
            original_left: startX, // X coordinate of the top-left corner of the rectangle
            original_top: startY, // Y coordinate of the top-left corner of the rectangle
            original_width: uWidth, // Width of the rectangle
            original_height: uHeight, // Height of the rectangle
            original_scaleX: scaleFactor,
            original_scaleY: scaleFactor,
            backgroundColor: 'white',
            selectable: true, // Make the textbox selectable
            editingBorderColor: 'black',
            hasBorders: true,
            fontSize: 12,
        });


        return correction;
    } catch(err) {
        console.log('err: ', err);
        return false;
    }
};