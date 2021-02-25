import React, { useRef } from "react";
import S3 from "react-aws-s3";

function Upload() {
  const fileInput = useRef();
  const handleClick = (event) => {
    event.preventDefault();
    let file = fileInput.current.files[0];
    console.log(file)
    let newFileName = fileInput.current.files[0].name.replace(/\..+$/, "");
    const config = {
      bucketName: "mobioticsprodbucket",
      dirName: "" /* optional */,
      region: "ap-south-1",
      accessKeyId: "AKIAWJ4FLJB3HAGZNYN3",
      secretAccessKey: "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",
    };
    const ReactS3Client = new S3(config);
    console.log(ReactS3Client)
    ReactS3Client.uploadFile(file, newFileName).then((data) => {
      console.log(data);
      if (data.status === 204) {
        console.log("success");
      } else {
        console.log("fail");
      }
    });
  };
  return (
    <>
      <form className='upload-steps' onSubmit={handleClick}>
        <label>
          Upload file:
          <input type='file' ref={fileInput} />
        </label>
        <br />
        <button type='submit'>Upload</button>
      </form>
    </>
  );
}

export default Upload;