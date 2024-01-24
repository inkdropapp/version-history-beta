import fs from 'fs'
import yaml from 'js-yaml'
import {
  readVersionFiles,
  readVersionData,
  readNotes,
  getPackageJson
} from './utils.mjs'

try {
  const versionFiles = readVersionFiles()
  const packageJson = getPackageJson()
  const version = packageJson.version

  // Read the most recent 10 Markdown files
  const notes = versionFiles
    .slice(0, 10)
    .map(file => {
      const versionData = readVersionData(file)
      const notesContent = readNotes(versionData.version)
      return `## v${versionData.version}\n${notesContent}`
    })
    .join('\n')

  const meta = {
    version: version,
    name: 'Inkdrop',
    notes: notes,
    pub_date: new Date(),
    files: [
      {
        platform: 'darwin',
        filetype: 'zip',
        filename: `Inkdrop-${version}-arm64-Mac.zip`,
        arch: 'arm64'
      },
      {
        platform: 'darwin',
        filetype: 'zip',
        filename: `Inkdrop-${version}-x64-Mac.zip`,
        arch: 'x64'
      },
      {
        platform: 'win32',
        filetype: 'zip',
        filename: `Inkdrop-${version}-Windows.zip`,
        arch: 'x64'
      },
      {
        platform: 'win32',
        filetype: 'installer',
        filename: `Setup.exe`,
        arch: 'x64',
        additionalFiles: {
          nupkg: `inkdrop-${version.replace('beta.', 'beta')}-full.nupkg`,
          releases: 'RELEASES'
        }
      },
      {
        platform: 'linux',
        filetype: 'zip',
        filename: `Inkdrop-${version}-Linux.zip`,
        arch: 'x64'
      },
      {
        platform: 'linux',
        filetype: 'deb',
        filename: `inkdrop_${version.replace('-', '~')}_amd64.deb`,
        arch: 'x64'
      },
      {
        platform: 'linux',
        filetype: 'rpm',
        filename: `inkdrop-${version.replace('-', '.')}-1.x86_64.rpm`,
        arch: 'x64'
      }
    ]
  }

  try {
    fs.mkdirSync('./output')
  } catch (e) {}

  const data = yaml.dump(meta, { lineWidth: 1000 })
  fs.writeFileSync('./output/meta.yaml', data)
  fs.writeFileSync('./output/BETA', 'v' + packageJson.version)
  console.log(
    `Successfully generated a meta file for version ${packageJson.version} to ./output/meta.yaml`
  )
} catch (e) {
  console.error(e)
}
