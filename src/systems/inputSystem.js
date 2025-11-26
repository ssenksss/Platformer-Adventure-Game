export const inputSystem = (() => {
    const keys = {};
    const justPressed = {};

   // inputSystem.js
window.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    if (!keys[key]) justPressed[key] = true;
    keys[key] = true;
});

window.addEventListener('keyup', e => {
    const key = e.key.toLowerCase();
    keys[key] = false;
    justPressed[key] = false;
});


    const consume = (key) => {
        if (justPressed[key]) {
            justPressed[key] = false;
            return true;
        }
        return false;
    };

    return { keys, consume };
})();
