const readPath = './raw/'; // Path to folder containing doc and pdf files
const savePath = './parsed/'; // Path to folder where txt will be saved
const chunkSize = 1000; // Max number of words per txt file to be saved

module.exports = {
    readPath,
    savePath,
    chunkSize
}
