import React, {useEffect} from "react";
import {Button} from "@material-ui/core";

function _FileUploader(props: React.PropsWithRef<{
  text?: string,
  onFileChange: (file: File | null) => void
}>, ref: any) {
  const fileRef = React.useRef<HTMLInputElement>(null);
  const buttonText = props.text ? props.text : '上传文件';

  useEffect(() => {
    ref.current = fileRef.current;
  }, [fileRef.current]);

  function handleClick() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  function handleChange() {
    if (fileRef.current) {
      if (fileRef.current.files) {
        const file = fileRef.current.files[0];
        props.onFileChange(file);
      }
    }
  }

  return (
    <Button onClick={handleClick} color={"secondary"} variant={"contained"}>
      {buttonText}
      <input type="file" ref={fileRef} onChange={handleChange} style={{display: "none"}}/>
    </Button>
  )
}

export const FileUploader = React.forwardRef(_FileUploader);
