export const createRenderable = (image = null, width = 32, height = 32) => ({
    image,  // nova svojina za sliku
    width,
    height,
    color: 'red' // fallback ako nema slike
});
