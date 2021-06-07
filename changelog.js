var fs = require('fs')
var yaml = require('js-yaml')
var dateFormat = require('dateformat')
var packageJson = require('./package.json')

try {
  var versions = yaml.safeLoad(fs.readFileSync('./history.yml', 'utf8'))
  var md = ''
  md += versions
    .splice(0, 10)
    .map(function (hist) {
      var lines = 'inkdrop (' + hist.version + ') trusty; urgency=medium\n\n'
      lines += hist.notes
        .split('\n')
        .map(function (line) {
          return '  ' + line
        })
        .join('\n')
      lines += '\n -- ' + packageJson.author + '  '
      if (hist.pub_date) {
        var pubDate = new Date(hist.pub_date)
        lines += dateFormat(pubDate, 'ddd, d mmm yyyy HH:MM:ss +0000') + '\n'
        return lines
      }
    })
    .join('\n')
  fs.writeFileSync('./changelog', md)
} catch (e) {
  console.error(e)
}
