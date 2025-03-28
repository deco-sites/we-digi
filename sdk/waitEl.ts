export default function waitForEl(selector: string) {
    return new Promise((resolve) => {
        function waitForElCb(selector: string) {
            console.log("chamou waitCB");

            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
            } else {
                setTimeout(function () {
                    waitForElCb(selector);
                }, 100);
            }
        }
        waitForElCb(selector);
    });
}