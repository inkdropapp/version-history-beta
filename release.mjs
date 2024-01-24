import { execSync } from 'child_process'
import { getPackageJson } from './utils.mjs'

const packageJson = getPackageJson()
const version = packageJson.version
const baseUrl = `s3://inkdrop-dist/`
const packageUrl = `${baseUrl}v${version}/`

function uploadFile(file, dest) {
  console.log('Uploading:', file)

  const res = execSync(
    `aws s3 cp output/${file} ${dest} --storage-class REDUCED_REDUNDANCY --acl public-read`
  ).toString()
  console.log(res)
}

uploadFile('meta.yaml', packageUrl)
uploadFile('BETA', baseUrl)
