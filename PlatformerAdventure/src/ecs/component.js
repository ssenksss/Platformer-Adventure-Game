//dodaje komponenetu odredjenom entitetu
export const addComponent = (entity, component, componentsMap) => ({
    ...componentsMap,
    [entity]: component
});
//vraca komponentu za dati entitet
export const getComponent = (entity, componentsMap) => componentsMap[entity];
