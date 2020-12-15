const readline = require('readline')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)
const appendFileAsync = promisify(fs.appendFile)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
const rootPath = `${__dirname}/components`.replace(
  '/tools/create/components',
  ''
)

console.log('rootPath', rootPath)

const createBaseComponent = (componentName) => `import React from 'react'
import styles from './${componentName}.module.scss'

const ${componentName} = () => {
  return <div className={styles.container}>4auto component</div>
}

export default ${componentName}
`

const baseStyles = `@import 'vars.scss';

.container {
  display: flex;
  flex-direction: column;
}
`

rl.question('Component name ? ', (rawComponentName) => {
  rl.question(
    `Component path? (Selected: /${rawComponentName}) `,
    async (rawPath) => {
      const componentName = rawComponentName.replace(/ /g, '')
      const path = rawPath.replace(/ /g, '')
      const componentPath = `${rootPath}/components/${
        path && !!path.trim() ? path.replace('/', '') : componentName
      }`

      if (!fs.existsSync(componentPath)) fs.mkdirSync(componentPath)
      await writeFileAsync(
        `${componentPath}/${componentName}.js`,
        createBaseComponent(componentName),
        (err) => {
          if (err) {
            return console.log(err)
          }
          console.log(`${componentPath}/${componentName}.js was created!`)
        }
      )
      await writeFileAsync(
        `${componentPath}/${componentName}.module.scss`,
        baseStyles,
        (err) => {
          if (err) {
            return console.log(err)
          }
          console.log(
            `${componentPath}/${componentName}.module.scss was created!`
          )
        }
      )
      await appendFileAsync(
        `${componentPath}/index.js`,
        `\rexport { default as ${componentName} } from './${componentName}'`,
        (err) => console.error(err)
      )
      rl.close()
    }
  )
})

rl.on('close', function () {
  console.log('\nComponent created')
  process.exit(0)
})
