const { discoveryW, toggleW, temperatureW, getStateW, rgbW, dimmW } = require("./controllers.js");

async function discovery() {
    let list = await discoveryW();
    return list;
}

async function toggle(ip) {
    await toggleW(ip);
    return true;
}

async function temperature(ip, temp) {
    await temperatureW(ip, temp);
    return true;
}

async function getState(ip) {
    let data = await getStateW(ip);    
    return data;
}

async function rgb(ip, r, g, b) {
    await rgbW(ip, r, g, b);
    return true
}

async function dimm(ip, dimm) {
    await dimmW(ip, dimm);
    return true
}


module.exports = {
    discovery,
    toggle,
    temperature,
    getState,
    rgb,
    dimm
}