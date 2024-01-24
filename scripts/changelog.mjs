import fs from 'fs'
import dateFormat from 'dateformat'
import {
  readVersionFiles,
  readVersionData,
  readNotes,
  getPackageJson
} from './utils.mjs'

const packageJson = getPackageJson()

try {
  const versionFiles = readVersionFiles()

  let md = ''

  versionFiles.slice(0, 10).forEach(file => {
    const versionData = readVersionData(file)
    const notes = readNotes(versionData.version)

    var lines = `inkdrop (${versionData.version}) trusty; urgency=medium\n\n`
    lines += notes
      .split('\n')
      .map(line => `  ${line}`)
      .join('\n')
    lines += '\n -- ' + packageJson.author + '  '
    if (versionData.pub_date) {
      var pubDate = new Date(versionData.pub_date)
      lines += dateFormat(pubDate, 'ddd, d mmm yyyy HH:MM:ss +0000') + '\n'
    }
    md += lines + '\n'
  })

  fs.writeFileSync('./changelog', md)
} catch (e) {
  console.error(e)
}
