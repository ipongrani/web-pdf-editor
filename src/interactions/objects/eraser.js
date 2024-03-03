export default async function newEraser({startX, startY, uWidth, uHeight, scaleFactor}) {
    try {
        // Create a rectangle object
        const eraser = new fabric.Rect({
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
            fill: 'white', // Fill color of the rectangle
            strokeWidth: 1, // Border width
            stroke: 'black'
        });

        return eraser;
    } catch(err) {
        console.log('err: ', err);
        return false;
    }
};