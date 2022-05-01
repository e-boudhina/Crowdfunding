const qr = require("qrcode");
const fs = require("fs");
const path = require("path");

module.exports = GenerateQrCode = async (eventId, userId) => {
    const qrCode = await qr.toBuffer(eventId.toString());
    const exactPath = path.join(__dirname, '../public/uploads/qrCodes');
    const userFolder = path.join(__dirname, `../public/uploads/qrCodes/${userId}`);

    if (!fs.existsSync(exactPath)) {
        fs.mkdirSync(exactPath);
        fs.mkdirSync(userFolder);
    } else if (!fs.existsSync(userFolder)) {
        fs.mkdirSync(userFolder);
    }
    fs.open(`${userFolder}/${eventId}.png`, 'w', (err, fd) => {
        fs.write(fd, qrCode, 0, qrCode.length, null, () => null);
    });

    return `uploads/qrCodes/${userId}/${eventId}.png`;
};