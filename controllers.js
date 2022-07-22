const find = require('local-devices');
const oui = require('oui');
const dgram = require('dgram');
const { Device } = require("./device");
const port = 38899;

const on = JSON.stringify({ "id": 1, "method": "setState", "params": { "state": true } });
const off = JSON.stringify({ "id": 1, "method": "setState", "params": { "state": false } });

async function discoveryW() {
    const vendors = ["wiz"];
    const devices = await find();
    let totalCount = 0
    let totalDevices = []
    for (let i = 0; i < devices.length; i++) {
        let result = await oui(devices[i].mac) ? oui(devices[i].mac).toLowerCase() : null;
        if (result && await vendors.map(vendor => result.includes(vendor)).includes(true)) {
            let vendor = await vendors.find(vendor => result.includes(vendor));
            let mac = devices[i].mac;
            let ip = devices[i].ip;
            let device = new Device(mac, ip, vendor, null, null, null, null, null);
            totalCount++
            totalDevices.push(device)
        }
    }
    return totalDevices
}

async function toggleW(ip) {
    const server = dgram.createSocket("udp4");
    const pilot = JSON.stringify({ "id": 1, "method": "getPilot", "params": {} });
    server.send(pilot, port, ip, async function (err) {
        if (err) throw err;
    });
    server.on("message", async function (message) {
        let data = await JSON.parse(message)
        let state = await data.result.state
        state ? server.send(off, port, ip) : server.send(on, port, ip)
        server.close()
    });
}

async function temperatureW(ip, temp) {
    const server = dgram.createSocket("udp4");
    const pilot = JSON.stringify({ "id": 1, "method": "setPilot", "params": { "temp": temp } });
    server.send(pilot, port, ip, async function (err) {
        if (err) return err;
        return true;
    }
    );
}

async function getStateW(ip) {    
    const server = dgram.createSocket("udp4");
    const pilot = JSON.stringify({ "id": 1, "method": "getPilot", "params": {} });
    let promise = new Promise((resolve, reject) => {
        server.send(pilot, port, ip, async function (err) {
            if (err) return err;
            return true;
        }
        );
        server.on("message", async function (message) {
            let data = await JSON.parse(message)
            let state = await data.result
            server.close()
            resolve(state)
        }
        );
    }
    )
    return promise
}


    
async function rgbW(ip, r, g, b) {
    const server = dgram.createSocket("udp4");
    const pilot = JSON.stringify({ "id": 1, "method": "setPilot", "params": { "r": r, "g": g, "b": b } });
    server.send(pilot, port, ip, async function (err) {
        if (err) return err;
    }
    );
    return true;
}

async function dimmW(ip, dimm) {
    const server = dgram.createSocket("udp4");
    const pilot = JSON.stringify({ "id": 1, "method": "setPilot", "params": { "dimm": dimm } });
    server.send(pilot, port, ip, async function (err) {
        if (err) return err;
    }
    );
    return true;
}

module.exports = {
    discoveryW,
    toggleW,
    temperatureW,
    getStateW,
    rgbW,
    dimmW,
}
