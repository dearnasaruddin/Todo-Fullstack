const fs = require('fs')
const path = require('path')

const localDatabasePath = path.join(__dirname, "userData.json")

const writeFile = (data) => {
    fs.writeFileSync(localDatabasePath, JSON.stringify(data, null, 2))
}

const readFile = () => {
    const data = fs.readFileSync(localDatabasePath, 'utf8')
    return data ? JSON.parse(data) : []
}

module.exports = { writeFile, readFile }