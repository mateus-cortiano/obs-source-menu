var fs = require('fs');
var $ = require('jquery');
var cheerio = require('cheerio');

fs.readFile("./index.html", (err, html) => {
  if (err) throw err;
  $ = cheerio.load(html.toString())

  fs.readFile("./css/style.css", (err, css) => {
    if (err) throw err;
    $('head')
      .find('link')
      .remove();

    $('head').append(`<style> ${css.toString()} </style>`)

    fs.readFile("./app/obsws.js", (err, obsws) => {
      if (err) throw err;

      $('body')
        .find('script')
        .remove()

      $('body')
        .append(`<script> ${obsws.toString()}`)

      fs.readFile("./app/main.js", (err, main) => {
        if (err) throw err;
        $('script')
          .append(`${main.toString()} </script>`);
        fs.appendFile("./dist/index.html", $.html(), {flag: "w"}, (err, f) => { if (err) throw err } )
      })

    })
  })
});