# Wiz Local


[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Find Wiz devices and control them with the Wiz Local app.
Each method will return a Promise that resolves with the result of the operation.

## Installation

### Npm

```console
npm install wiz-local
```

### Example

const {discovery, toggle, temperature, getState, rgb, dimm} = require('wiz-local');

// Find Wiz local devices.
async () => {
  const devices = await discovery();
  console.log(devices);
  devices /*
  [
    {
    "id": "00:00:00:00:00:00",
    "mac": "00:00:00:00:00:00",
    "ip": "192.168.0.102",
    "vendor": "wiz",
    "name": "",
    "description": "",
    "type": "",
    "status": "",
    "location": ""
  },
  {
    "id": "00:00:00:00:00:00",
    "mac": "00:00:00:00:00:00",
    "ip": "192.168.0.119",
    "vendor": "wiz",
    "name": "",
    "description": "",
    "type": "",
    "status": "",
    "location": ""
  },
  ]
    */
}

// Toggle a device.
async () => {
  const devices = await discovery();
  const device = devices[0];
  await toggle(device, true); // true to turn on and false to turn off.(Use boolean, not string)
}

// Change the light temperature of a device.
async () => {
  const devices = await discovery();
  const device = devices[0];
  await temperature(device, 2700); // 2200 to 6500 is the temperature in Kelvin.(Use integer, not string)
}

// Get the state of a device.
async () => {
  const devices = await discovery();
  const device = devices[0];
  const state = await getState(device);
  console.log(state);
  state /*
  {
      "mac": "00000000",
      "rssi": -49,
      "src": "",
      "state": false,
      "sceneId": 0,
      "temp": 6500,
      "dimming": 100
    }
    */
}

// Change the color of a device.
async () => {
  const devices = await discovery();
  const device = devices[0];
  await rgb(device, 255, 255, 255); // 0 to 255 is the color value.(Use integer, not string)
}

// Change the intensity of a device.
async () => {
  const devices = await discovery();
  const device = devices[0];
  await dimm(device, 100); // 0 to 100 is the intensity value.(Use integer, not string)
}




