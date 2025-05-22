function setupMutationObserverSafe() {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    const callback = function(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                let pageBody = document.querySelector(".container.page-body");
                let pageHead = document.querySelector(".page-head");
                if (pageBody && pageBody.classList.contains("container")) {
                    pageBody.classList.remove("container");
                    console.log("Removed container class from pageBody");
                }

                if (pageHead) {
                    const headContainer = pageHead.querySelector(".container");
                    if (headContainer) {
                        headContainer.classList.remove("container");
                        console.log("Removed container class from pageHead");
                    }
                }
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}

// Run on first load
document.addEventListener("DOMContentLoaded", function () {
    setupMutationObserverSafe();
});

// Run when navigating inside the app (Frappe SPA behavior)
frappe.router.on('change', function () {
    setupMutationObserverSafe();
});
