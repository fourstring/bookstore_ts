export const readFileAsText = (inputFile: File): Promise<string> => {
  const temporaryFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result as string);
    };
    temporaryFileReader.readAsText(inputFile);
  });
};

export const readFileAsArrayBuffer = (inputFile: File): Promise<ArrayBuffer> => {
  const temporaryFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result as ArrayBuffer);
    };
    temporaryFileReader.readAsArrayBuffer(inputFile);
  });
};

export const readFileAsDataURL = (inputFile: File): Promise<string> => {
  const temporaryFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result as string);
    };
    temporaryFileReader.readAsDataURL(inputFile);
  });
};
