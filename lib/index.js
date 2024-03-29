"use strict";
const { Storage } = require("@google-cloud/storage");
const glob = require("glob");
const path = require("path");
const fs = require("fs");

/**
 * Upload files and folder to google cloud storage bucket
 * @param {Object} o - Function options
 * @param {string} o.directoryPath - Local folder absolute path to upload
 * @param {string} o.bucketName - Google cloud bucket name
 * @returns {Object} Callback function responce data
 */
module.exports = async(o) => {
    if (typeof o !== "object") {
        throw new TypeError("options must be a object to req.get");
    }

    if (!o.bucketName) {
        throw new TypeError("bucket name must be a string to req.get");
    }

    if (!o.keyFilename || !fs.existsSync(o.keyFilename)) {
        throw new TypeError(
            "key file - no such file or directory, stat " +
            path.resolve(o.keyFilename)
        );
    }

    if (!o.directoryPath || !fs.existsSync(o.directoryPath)) {
        throw new TypeError(
            "directory - no such file or directory, stat " +
            path.resolve(o.directoryPath)
        );
    }

    let ifObject = false;

    return new Promise((resolve, reject) => {
        glob(
            path.resolve(`${o.directoryPath}/**/*`), { strict: false, silent: true, nodir: true },
            (err, fileList) => {
                if (err) {
                    reject(err);
                } else {
                    if (ifObject) {
                        let filesObject = fileList.map((file) => {
                            let regexp = /^(.*[\\\/])(.*)$/;
                            let match = regexp.exec(file);
                            return {
                                fullpath: file,
                                filepath: match[1],
                                filename: match[2],
                                dirname: regexp.exec(
                                    match[1].substring(0, match[1].length - 1)
                                )[2],
                            };
                        });
                        resolve(filesObject);
                    } else {
                        resolve(_uploadToGCS(o, fileList));
                    }
                }
            }
        );
    });
};

/**
 * To upload files and folder to GCS bucket
 * @param {Object} o - Function options
 * @param {Object} fileList - Directory all file lsit Object
 * @param {string} o.directoryPath - Directory path string
 * @returns {Object} Uploaded file and status response
 */
const _uploadToGCS = (o, fileList) => {
    if (typeof o !== "object") {
        throw new TypeError("options must be a object to req.get");
    }

    if (typeof fileList !== "object") {
        throw new TypeError("fileList must be a object to req.get");
    }

    const storage = new Storage({ keyFilename: o.keyFilename });
    let lastStringPath = o.directoryPath.split("/").pop();
    const pathDirName = path.dirname(o.directoryPath);
    const bucketName = o.bucketName;

    const promises = fileList.map((filePath) => {
        let destination = path.relative(pathDirName, filePath);

        if (o.bucketPath != "") {
            const bucketPath = `${o.bucketPath}/`;
            destination = destination.split('/').slice(1).join('/');
            destination = bucketPath.concat("", destination);
        }

        if (process.platform === "win32") {
            destination = destination.replace(/\\/g, "/");
        }

        let opts;
        if (typeof o.metaData === "object") {
            o.metaData.destination = destination;
            opts = o.metaData;
        } else {
            opts = { destination };
        }

        return storage.bucket(bucketName).upload(filePath, opts);
    });

    return Promise.all(promises).then(function(results) {
        const successfulUploads =
            results.length - results.filter((r) => r.status instanceof Error).length;

        let responce = {
            status: 200,
            files: `${successfulUploads} files uploaded successfully`,
            fileList: fileList,
            bucketUrl: `https://storage.googleapis.com/${bucketName}/${
        o.bucketPath ? o.bucketPath : lastStringPath
      }`,
        };

        return responce;
    });
};