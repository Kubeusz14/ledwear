export const inputs = {};

export function setValue(key, value) {
    inputs[key] = value;
}

export function getValue(key) {
    return inputs[key];
}