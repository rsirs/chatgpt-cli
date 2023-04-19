const os = require('os');
const crypto = require('crypto');

function generateEncryptionKey() {
    const cpuInfo = os.cpus()[0].model;
    const osInfo = os.type() + os.release();
    const keyBase = cpuInfo + osInfo;
    return crypto.createHash('sha256').update(keyBase).digest();
}

function encrypt(text) {
    const key = generateEncryptionKey(); // Use the generated encryption key
    const iv = crypto.randomBytes(16); // Generate a random 128-bit IV

    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();

    // Store the IV, authTag, and encrypted data together
    return Buffer.concat([iv, authTag, encrypted]).toString('base64');
}

function decrypt(encryptedText) {
    const encryptedBuffer = Buffer.from(encryptedText, 'base64');

    // Extract the IV, authTag, and encrypted data from the stored data
    const iv = encryptedBuffer.slice(0, 16);
    const authTag = encryptedBuffer.slice(16, 32);
    const encryptedData = encryptedBuffer.slice(32);

    const key = generateEncryptionKey(); // Use the generated encryption key
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
    return decrypted.toString('utf8');
}


module.exports = {
    encrypt,
    decrypt
}