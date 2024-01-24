import fs from 'fs'
import path from 'path'

const versionsDir = './versions'

function createRelease(version) {
  const currentDate = new Date().toISOString()
  const jsonData = {
    version: version,
    pub_date: currentDate
  }

  const jsonFilePath = path.join(versionsDir, `v${version}.json`)
  const mdFilePath = path.join(versionsDir, `v${version}.md`)

  // Ensure the versions directory exists
  if (!fs.existsSync(versionsDir)) {
    fs.mkdirSync(versionsDir)
  }

  // Write JSON file
  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2))

  // Create an empty Markdown file
  fs.writeFileSync(mdFilePath, '')

  console.log(`Release files for version ${version} created.`)
}

const versionArg = process.argv[2]

if (!versionArg) {
  console.error('Error: No version number provided.')
  process.exit(1)
}

createRelease(versionArg)
