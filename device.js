 class Device {
    constructor(mac, ip, vendor, name, description, type, status, location) {
        this.id = mac;
        this.mac = mac;
        this.ip = ip;
        this.vendor = vendor;
        this.name = name || '';
        this.description = description || '';
        this.type = type || '';
        this.status = status || '';
        this.location = location || '';
    }
}

module.exports = {
    Device
}
