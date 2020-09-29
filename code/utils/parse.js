const COMPONENTS = {
    "01": "gtin",
    "21": "serialNumber",
    "10": "batch",
    "17": "expiration"
}

export default function parse(gs1String) {
    let rawComponents = gs1String.split('(');
    if (rawComponents[0] !== "") {
        throw Error(`Invalid format for string ${gs1String}`);
    }

    rawComponents.shift();
    const components = {};
    rawComponents.forEach(rawComponent => {
        const splitRawComponent = rawComponent.split(')');
        const componentName = COMPONENTS[splitRawComponent[0]];
        if (typeof componentName === "undefined") {
            throw Error(`Invalid format for string ${gs1String}`);
        }
        components[componentName] = splitRawComponent[1];
    });

    return components;
}