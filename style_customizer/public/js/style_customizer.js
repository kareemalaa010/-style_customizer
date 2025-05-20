function setupMutationObserver() {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };
    
    const callback = function(mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                let pageBody = document.querySelector(".container.page-body");
                let pageHead = document.querySelector(".page-head");
                if (pageBody) {
                    pageBody.classList.remove("container");
                    pageHead.querySelector(".container").classList.remove("container");
                    console.log("Element found and modified via observer:", pageBody);
                    observer.disconnect(); // Stop observing once found
                    return;
                }
            }
        }
    };
    
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}
    
setupMutationObserver();