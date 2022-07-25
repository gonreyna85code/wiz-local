const { discoveryW, toggleW, temperatureW, getStateW, rgbW, dimmW } = require("./controllers.js");

async function discovery() {
    let list = await discoveryW();
    return list;
}

async function toggle(ip, state) { //state = true or false
    await toggleW(ip, state);
    return true;
}

async function temperature(ip, temp) {  //temp = 2200 to 6500
    await temperatureW(ip, temp);
    return true;
}

async function getState(ip) {
    let data = await getStateW(ip);    
    return data;
}

async function rgb(ip, r, g, b) { //r,g,b = 0 to 255
    await rgbW(ip, r, g, b);
    return true
}

async function dimm(ip, dimm) { //dimm = 0 to 100
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