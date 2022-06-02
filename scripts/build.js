/* build.js */

const fs = require('fs')

// ---

const TITLE = 'obs studio scene menu'
const OUTPUT_DIR = './public'
const OUTPUT_FILE = 'index.html'

// ---

let output_path = `${OUTPUT_DIR}/${OUTPUT_FILE}`
let buffer = `<!-- ${TITLE} -->\r\n\r\n`

buffer += fs.readFileSync('./dist/index.html', 'utf8')

buffer = buffer.replace('</html>', '')
buffer = buffer.replace(/^.*<script.*><\/script>\r\n/m, '')
buffer = buffer.replace(/^.*<link.*>\r\n/m, '')

buffer += '\r\n<style>\r\n'
buffer += fs.readFileSync('./dist/styles.css', 'utf8')
buffer += '\r\n</style>\r\n'

buffer += '\r\n<script>\r\n'
buffer += fs.readFileSync('./dist/bundle.js', 'utf8')
buffer += '\r\n</script>\r\n'

buffer += '\r\n</html>\r\n'

if (!fs.existsSync(output_path)) fs.mkdirSync(OUTPUT_DIR)

fs.writeFileSync(output_path, buffer, 'utf-8', err => {
  if (err) throw err
})
