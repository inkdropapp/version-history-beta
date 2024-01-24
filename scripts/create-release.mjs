import fs from 'fs'
import path from 'path'

const versionsDir = './versions'
const packageJsonPath = './package.json'

function updatePackageVersion(version) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  packageJson.version = version
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
}

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

  // Update version in package.json
  updatePackageVersion(version)

  console.log(
    `Release files for version ${version} created and package.json updated.`
  )
}

const versionArg = process.argv[2]

if (!versionArg) {
  console.error('Error: No version number provided.')
  process.exit(1)
}

createRelease(versionArg)
