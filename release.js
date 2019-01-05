const execSync = require('child_process').execSync

const version = require('./package.json').version
const baseUrl = `s3://inkdrop-dist/`
const packageUrl = `${baseUrl}v${version}/`

function uploadFile(file, dest) {
  console.log('uploading:', file)

  const res = execSync(
    `aws s3 cp output/${file} ${dest} --storage-class REDUCED_REDUNDANCY --acl public-read`
  ).toString()
  console.log(res)
}

uploadFile('meta.yaml', packageUrl)
uploadFile('BETA', baseUrl)
