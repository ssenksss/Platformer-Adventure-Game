//kontrolise poziciju kamere
export const cameraSystem = (camera, playerId, components) => {
    if(components.position[playerId]){
        camera.x = components.position[playerId].x - 400;
        camera.y = components.position[playerId].y - 300; //kamera prati igraca da bude u centru


           if (camera.y < 0) camera.y = 0; // da kamera ne ide iznad levela
           if (camera.x < 0) camera.x = 0;
    }


};
