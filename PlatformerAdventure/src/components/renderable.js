//definise kako se crta entitet
export const createRenderable = (image = null, width = 32, height = 32) => ({
    image, 
    width,
    height,
    color: 'red' // fallback ako nema slike
});
