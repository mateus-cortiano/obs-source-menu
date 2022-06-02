/* build.js */

const fs = require('fs')

// ---

const TITLE = 'obs studio scene menu'
const OUTPUT_FILE = './public/index.html'
// const JQUERY_CDN =
//   '<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>'

// ---

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

fs.writeFileSync(OUTPUT_FILE, buffer, 'utf-8', err => {
  if (err) throw err
})
