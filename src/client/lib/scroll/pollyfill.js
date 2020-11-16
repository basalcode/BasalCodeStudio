export const mouseWheel = () => {
    let addEventListenerType;
    let on = "";

    // check event model
    if (window.addEventListener) {
        addEventListenerType = "addEventListener";
    } else {
        addEventListenerType = "attachEvent";
        on = "on";
    }

    let supportType;
    window.addWheelListener = (element, callback, useCapture) => {
        supportType = "onwheel" in document.createElement("div") ? "wheel" : // modern browser
            document.onmousewheel !== undefined ? "mousewheel" : // webkit, IE
            "DOMMouseScroll"; // Firefox

            addWheelEvent(element, supportType, callback, useCapture);

        // firefox
        if (supportType === "DOMMouseScroll") {
            addWheelEvent(element, "MozMousePixelScroll", callback, useCapture);
        }
    }   

    const addWheelEvent = (element, eventName, callback, useCapture) => {
        element[addEventListenerType](on + eventName, supportType === "wheel" ?
            callback :
            (originalEvent) => {
                !originalEvent && (originalEvent = window.event);
                
                let event = {
                    originalEvent: originalEvent,
                    target: originalEvent.target || originalEvent.srcElement,
                    type: "wheel",
                    deltaMode: originalEvent.type === "MozMousePixelScroll" ? 0 : 1,
                    deltaX: 0,
                    deltaZ: 0,
                    preventDefault: () => {
                        originalEvent.preventDefault ?
                            originalEvent.preventDefault() :
                            originalEvent.returnValue = false;
                    }
                }

                // delta Y
                if (supportType === "mousewheel") {
                    event.deltaY = -1/40 * originalEvent.wheelDelta;

                    originalEvent.wheelDeltaX && (event.deltaX = -1/40 * originalEvent.wheelDeltaX);
                } else {
                    event.deltaY = originalEvent.detail;
                }

                return callback(event);
            }, useCapture || false);
    }
}