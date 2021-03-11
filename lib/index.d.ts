/**
To upload files and folder from a directory to google cloud bucket.
@param bucketName - Google Cloud bucket name.
@param keyFilename - Bucket configuration key file path.
@param directoryPath - Directory to upload.
@param bucketPath - Optional, Unique bucket folder name.
@param metaData - Optional.
@returns The username for the `email` or `undefined` if it cannot be found.
@example
```
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
```
*/

declare function uploadDirectory (options: Object): Promise<Object | undefined>;

export = uploadDirectory ;