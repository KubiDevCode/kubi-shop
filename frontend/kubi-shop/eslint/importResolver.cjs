const fs = require('fs')
const path = require('path')

const extensions = ['', '.ts', '.tsx', '.js', '.jsx', '.json']

function resolveFile(filePath) {
  for (const extension of extensions) {
    const candidate = `${filePath}${extension}`

    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate
    }
  }

  for (const extension of extensions.slice(1)) {
    const candidate = path.join(filePath, `index${extension}`)

    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate
    }
  }

  return null
}

module.exports = {
  interfaceVersion: 2,

  resolve(source, file, config = {}) {
    const alias = config.alias ?? '@'
    const root = config.root ?? 'src'
    const aliasPrefix = `${alias}/`

    if (!source.startsWith(aliasPrefix)) {
      return { found: false }
    }

    const projectRoot = process.cwd()
    const sourcePath = source.slice(aliasPrefix.length)
    const resolvedPath = resolveFile(path.resolve(projectRoot, root, sourcePath))

    if (!resolvedPath) {
      return { found: false }
    }

    return {
      found: true,
      path: resolvedPath,
    }
  },
}
