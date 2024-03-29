## Upload Directory To Google Cloud Bucket

![npm](https://img.shields.io/npm/v/google-cloud-directory-upload) [![Support Node of LTS](https://img.shields.io/badge/node-latest-brightgreen.svg)](https://nodejs.org/)

To upload files and folder from a directory to google cloud bucket.

## Installation

```bash
$ npm install google-cloud-directory-upload
```

## Usage

```javascript
var uploadDirectory = require("google-cloud-directory-upload");
```

## Upload Directory To Google Cloud Bucket Example

```javascript
// options
const options = {
  bucketName: "bucketName", // Google Cloud bucket name
  keyFilename: "../../keys.json", // Bucket configuration key file path
  directoryPath: "../../tests/reports/mochareports", // Directory to upload
  bucketPath: "report", // optional, Unique bucket folder name
  metaData: { // optional
    predefinedAcl: "publicRead",
  },
};

// request
(async () => {
  console.log(await uploadDirectory(options)); // returns <response_data>
})();

// response
{
  status: 200,
  files: '7 files uploaded successfully',
  fileList: [
    '/tests/reports/mochareports/assets/app.css',
    '/tests/reports/mochareports/assets/app.css.map',
    '/tests/reports/mochareports/assets/app.js',
    '/tests/reports/mochareports/assets/app.js.LICENSE.txt',
    '/tests/reports/mochareports/assets/app.js.map',
    '/tests/reports/mochareports/assets/MaterialIcons-Regular.woff',
    '/tests/reports/mochareports/assets/MaterialIcons-Regular.woff2',
  ],
  bucketUrl: 'https://storage.googleapis.com/{bucketName}/{bucketPath}'
}
```

For more google cloud storage options follow [Google Cloud Storage][google-storage].

## License

[MIT license](http://opensource.org/licenses/MIT).

## Copyright

Copyright &copy; 2021. S.Gupta

[google-storage]: https://www.npmjs.com/package/@google-cloud/storage
