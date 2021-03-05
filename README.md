## Google cloud bucket directory upload

![npm](https://img.shields.io/npm/v/google-cloud-directory-upload) [![Support Node of LTS](https://img.shields.io/badge/node-latest-brightgreen.svg)](https://nodejs.org/) [![dependencies Status](https://status.david-dm.org/gh/request/request.svg)](https://david-dm.org/request/request)

To upload files and folder from a local directory to google cloud bucket.

## Installation

```bash
$ npm install google-cloud-directory-upload
```

## Usage

```javascript
var uploadDirectory = require("google-cloud-directory-upload");
```

## Google cloud bucket directory upload Example

```javascript
// To upolad files and folder from a directory to google cloud bucket
const options = {
  bucketName: "bucketName", // Google Cloud bucket name
  keyFilename: "../../keys.json", // Bucket configuration key file path
  directoryPath: "../../tests/reports/mochareports", // Directory to upload
  bucketPath: "report", // Unique name for bucket folder to upload files
};

(async () => {
  console.log(await uploadDirectory(options)); // returns <response_data>
})();

// response
{
  status: 200,
  files: '7 files uploaded successfully',
  fileList: [
    'D:/Project/tests/reports/mochareports/assets/app.css',
    'D:/Project/tests/reports/mochareports/assets/app.css.map',
    'D:/Project/tests/reports/mochareports/assets/app.js',
    'D:/Project/tests/reports/mochareports/assets/app.js.LICENSE.txt',
    'D:/Project/tests/reports/mochareports/assets/app.js.map',
    'D:/Project/tests/reports/mochareports/assets/MaterialIcons-Regular.woff',
    'D:/Project/tests/reports/mochareports/assets/MaterialIcons-Regular.woff2',
  ],
  bucket_url: 'https://storage.cloud.google.com/{bucketName}/{bucketPath}'
}
```

For more google cloud storage options flow [Storage Cloud Google][google-storage].

## License

[MIT license](http://opensource.org/licenses/MIT).

## Copyright

Copyright &copy; 2021. S.Gupta

[google-storage]: https://www.npmjs.com/package/@google-cloud/storage
