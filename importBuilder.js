const lineReader = require('line-reader')
const fs = require('fs')
const Promise = require('bluebird')

const buildImports = () => {
  const path = `${__dirname}/components`
  const output = `${__dirname}/components/index.js`

  const getDirectories = (source) =>
    fs
      .readdirSync(source, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)

  const dirs = getDirectories(path)

  fs.unlink(output, (err) => {
    if (err) {
      console.log(err)
    }
  }) // delete file

  const writeExports = () => {
    fs.appendFile(output, `\nexport {\n`, (err) => {
      if (err) throw err
    })

    dirs.forEach((directory, index) => {
      const eachLine = Promise.promisify(lineReader.eachLine)
      eachLine(`${path}/${directory}/index.js`, (line, notLast) => {
        const startIndex = line.indexOf('default as') + 'default as'.length
        const endIndex = line.indexOf('}')
        const component = line.substring(startIndex, endIndex).trim()
        fs.appendFile(output, `\t${component},\n`, (err) => {
          if (err) throw err
        })
      })
        .then(() => {
          if (index === dirs.length - 1) {
            setTimeout(() => {
              fs.appendFile(output, `}`, (err) => {
                if (err) throw err
              })
            }, 200)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    })
  }

  const writeImports = () => {
    dirs.forEach((directory, index) => {
      const eachLine = Promise.promisify(lineReader.eachLine)
      let result = 'import {'
      eachLine(`${path}/${directory}/index.js`, (line, notLast) => {
        const startIndex = line.indexOf('default as') + 'default as'.length
        const endIndex = line.indexOf('}')
        const component = line.substring(startIndex, endIndex).trim()
        if (!notLast) result += ` ${component},`
        if (notLast) result += ` ${component}`
      })
        .then(() => {
          console.log(`Importing /component/${directory}`)
          result += ` } from './${directory}'`
          fs.appendFile(output, `${result}\n`, (err) => {
            if (err) throw err
          })
          if (index === dirs.length - 1) {
            setTimeout(() => {
              writeExports()
            }, 200)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    })
  }

  writeImports()
  //
}

buildImports()
