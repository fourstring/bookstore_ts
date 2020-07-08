import React, {useState} from "react";
import {FileUploader} from "../components/FileUploader";

export function useFileUploader(text?: string): [File | null, JSX.Element, () => void] {
  const [file, setFile] = useState<File | null>(null);
  const clearRef = React.useRef<HTMLInputElement>(null);
  console.log(clearRef);

  function handleChange(selectedFile: File | null) {
    setFile(selectedFile);
  }

  function clearSelected() {
    if (clearRef.current) {
      clearRef.current.value = "";
      handleChange(null);
    }
  }

  return [
    file,
    (
      <FileUploader text={text} onFileChange={handleChange} ref={clearRef}/>
    ),
    clearSelected
  ];
}
