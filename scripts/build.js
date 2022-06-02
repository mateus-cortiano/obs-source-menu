/* build.js */

const fs = require('fs')

// ---

const TITLE = 'obs studio scene menu'
const OUTPUT_FILE = './dist/bundle.html'
// const JQUERY_CDN =
//   '<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>'

// ---

let buffer = `<!-- ${TITLE} -->\r\n\r\n`

fs.readFile('./dist/index.html', 'utf8', (err, data) => {
  if (err) throw err

  for (let line of data.split('\r\n')) buffer += '  ' + line + '\r\n'
})

fs.readFile('./dist/styles.css', 'utf8', (err, data) => {
  if (err) throw err

  buffer += '<style>\r\n'

  for (let line of data.split('\r\n')) buffer += '  ' + line + '\r\n'

  buffer += '</style>\r\n'
})

fs.readFile('./dist/bundle.js', 'utf8', (err, data) => {
  if (err) throw err

  buffer += '<script>\r\n'

  buffer += data

  buffer += '</script>\r\n\r\n\r\n'
})

fs.readFile(OUTPUT_FILE, 'utf8', err => {
  if (err) throw err

  fs.writeFile(OUTPUT_FILE, buffer, 'utf8', err => {
    if (err) throw err
  })
})
