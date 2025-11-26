export const addComponent = (entity, component, componentsMap) => ({
    ...componentsMap,
    [entity]: component
});

export const getComponent = (entity, componentsMap) => componentsMap[entity];
