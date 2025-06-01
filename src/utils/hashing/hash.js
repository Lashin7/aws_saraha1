import bcrypt from "bcrypt"
// generate hash
// export const hash = (plainText, rounds) => {
//     const saltRounds = rounds || 10;
//     return bcrypt.hashSync(plainText, saltRounds)

// }
export const hash = ({ plainText, rounds = Number(process.env.ROUNDS) }) => {
    return bcrypt.hashSync(plainText, rounds)
};
export const compareHash = ({ plainText, hash }) => {
    return bcrypt.compareSync(plainText, hash)
}