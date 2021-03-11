/**
To upload files and folder from a directory to google cloud storage bucket.
@param bucketName - Google Cloud bucket name.
@param keyFilename - Bucket configuration key file path.
@param directoryPath - Directory to upload.
@param bucketPath - Optional, Unique bucket folder name.
@param metaData - Optional.
@returns The username for the `email` or `undefined` if it cannot be found.
@example
```
// usage
import uploadDirectory  = require("google-cloud-directory-upload");
const options = {
  bucketName: "bucketName",
  keyFilename: "../../keys.json",
  directoryPath: "../../tests/reports/mochareports",
  bucketPath: "report",
  metaData: { 
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
*/

declare function uploadDirectory (options: Object): Promise<Object | undefined>;

export = uploadDirectory ;