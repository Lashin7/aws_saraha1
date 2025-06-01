import CryptoJS from "crypto-js"
export const encrypt = ({ plainText, secretKey = process.env.SECRET_KEY }) => {
    return CryptoJS.AES.encrypt(plainText, secretKey).toString()
}
export const decrypt = ({ cipherText, secretKey = process.env.SECRET_KEY }) => {
    return CryptoJS.AES.decrypt(cipherText, secretKey).toString(CryptoJS.enc.Utf8)
}