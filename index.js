var fs = require('fs')
var yaml = require('js-yaml')
var dateFormat = require('dateformat')

try {
  var versions = yaml.load(fs.readFileSync('./history.yml', 'utf8'))
  var md = '# Inkdrop Release Notes (Beta)\n'
  md += '\n'
  md += versions
    .map(function (hist) {
      var lines = '## v' + hist.version + '\n'
      if (hist.pub_date) {
        var pubDate = new Date(hist.pub_date)
        lines += dateFormat(pubDate, 'yyyy-mm-dd') + '\n'
      }
      lines += '\n' + hist.notes
      return lines
    })
    .join('\n')
  md += '\n'
  md += '* * *\n'
  md +=
    'The release notes for older versions can be found [here](https://github.com/inkdropapp/version-history/blob/master/README-old.md)\n'
  md += '\n'
  fs.writeFileSync('./README.md', md)
} catch (e) {
  console.error(e)
}
