const readline = require('readline')
const fs = require('fs')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
const rootPath = `${__dirname}/components`

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

rl.question('Component name ? ', (componentName) => {
  rl.question(`Component path? (Selected: /${componentName})`, (path) => {
    const componentPath = `${rootPath}/${
      path ? path.replace('/', '') : componentName
    }`

    if (!fs.existsSync(componentPath)) fs.mkdirSync(componentPath)
    fs.writeFile(
      `${componentPath}/${componentName}.js`,
      createBaseComponent(componentName),
      (err) => {
        if (err) {
          return console.log(err)
        }
        console.log(`${componentPath}/${componentName}.js was created!`)
      }
    )

    fs.writeFile(
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
    rl.close()
  })
})

rl.on('close', function () {
  console.log('\nComponent created')
  process.exit(0)
})
