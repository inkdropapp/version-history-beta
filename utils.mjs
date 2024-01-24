import fs from 'fs'
import path from 'path'
import semver from 'semver'

const versionsDir = './versions'

export function readVersionFiles() {
  const versionFiles = fs
    .readdirSync(versionsDir)
    .filter(file => file.endsWith('.json'))
  // Sort the version files in descending order
  return versionFiles.sort((a, b) =>
    semver.rcompare(
      a.replace('v', '').replace('.json', ''),
      b.replace('v', '').replace('.json', '')
    )
  )
}

export function readVersionData(file) {
  return JSON.parse(fs.readFileSync(path.join(versionsDir, file), 'utf8'))
}

export function readNotes(version) {
  const mdFilePath = path.join(versionsDir, `v${version}.md`)
  return fs.readFileSync(mdFilePath, 'utf8')
}

export function readJsonFile(filePath) {
  const rawData = fs.readFileSync(filePath)
  return JSON.parse(rawData)
}

export function getPackageJson() {
  return readJsonFile('./package.json')
}
