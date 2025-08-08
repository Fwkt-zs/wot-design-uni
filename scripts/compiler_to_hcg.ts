import fs from 'fs'
import path from 'path'

const src = path.resolve(__dirname, '../src/uni_modules/wot-design-uni')
const libDir = path.resolve(__dirname, '../lib')

const copyComponents = function (srcPath: string, tarPath: string, filter: string[] = []) {
  fs.mkdir(tarPath, (err) => {})
  fs.readdir(srcPath, function (err, files) {
    if (err === null) {
      files.forEach(function (filename) {
        const filedir = path.join(srcPath, filename)
        const filterFlag = filter.some((item) => {
          return path.extname(filename).toLowerCase() === item && filename !== 'changelog.md'
        })
        if (!filterFlag) {
          fs.stat(filedir, function (errs, stats) {
            const isFile = stats.isFile()
            if (isFile) {
              const destPath = path.join(tarPath, filename)

              // 处理 package.json

              fs.copyFile(filedir, destPath, (err) => {
                if (err) console.error(err)
                if (destPath.endsWith('package.json')) {
                  const destStr = fs.readFileSync(destPath, 'utf-8')
                  const destJson = JSON.parse(destStr.replaceAll('wot-design-uni', 'hcg-app-ui'))
                  fs.writeFileSync(destPath, JSON.stringify(destJson, null, 2))
                }
              })
            } else {
              const tarFiledir = path.join(tarPath, filename)
              copyComponents(filedir, tarFiledir, filter)
            }
          })
        }
      })
    } else {
      if (err) console.error(err)
    }
  })
}

copyComponents(src, libDir, ['.md'])

const copyFile = function (srcPath: string, tarPath: string) {
  const isFile = fs.statSync(srcPath).isFile()
  if (isFile) {
    fs.copyFile(srcPath, tarPath, (err) => {})
  }
}

const readme = path.resolve(__dirname, '../README.md')
const license = path.resolve(__dirname, '../LICENSE')
copyFile(readme, path.join(libDir, 'README.md'))
copyFile(license, path.join(libDir, 'LICENSE'))
