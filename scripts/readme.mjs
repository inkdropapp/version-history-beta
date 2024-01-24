import fs from 'fs'
import dateFormat from 'dateformat'
import { readVersionFiles, readVersionData, readNotes } from './utils.mjs'

try {
  const versionFiles = readVersionFiles()

  let md = '# Inkdrop Release Notes (Beta)\n\n'

  versionFiles.forEach(file => {
    const versionData = readVersionData(file)
    const notes = readNotes(versionData.version)

    let lines = `## v${versionData.version}\n`
    if (versionData.pub_date) {
      const pubDate = new Date(versionData.pub_date)
      lines += dateFormat(pubDate, 'yyyy-mm-dd') + '\n'
    }
    lines += '\n' + notes + '\n'
    md += lines
  })

  md += '\n* * *\n\n'
  md +=
    'The release notes for older versions can be found [here](https://github.com/inkdropapp/version-history/blob/master/README-old.md)\n\n'
  fs.writeFileSync('./README.md', md)
} catch (e) {
  console.error(e)
}
