export const cameraSystem = (camera, playerId, components) => {
    if(components.position[playerId]){
        camera.x = components.position[playerId].x - 400;
        camera.y = components.position[playerId].y - 300;


           // FIX — kamera ne sme da ide iznad levela
           if (camera.y < 0) camera.y = 0;
           if (camera.x < 0) camera.x = 0;
    }


};
