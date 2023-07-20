import React, { useRef, useEffect } from 'react';
//import { uploadFile } from '@librechat/data-provider';

function FileUploadButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const uploadFile = useUploadFileMutation();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const allowedExtensions = ['.pdf', '.txt', '.docx'];
    const files = Array.from(event.target.files as FileList);

    const selectedFiles = files.filter((file) => {
      const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
      return allowedExtensions.includes(extension);
    });

    // Upload the file
    const file = selectedFiles[0];
    const formData = new FormData();
    formData.append('file', file);
    // const { data } = await uploadFile(formData);
    // console.log('data', data);

    //upload the file using the fetch api
    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // Reset the file input value to allow reselecting the same file
    event.target.value = '';
  };

  const handleClick = (): void => {
    fileInputRef.current?.click();
  };

  // useEffect(() => {
  //   if (uploadFile.isSuccess) {
  //     console.log(uploadFile.data);
  //   }
  //   if (uploadFile.isError) {
  //     console.log(uploadFile.error);
  //   }
  // }, [uploadFile]);

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.txt,.docx"
        multiple={false}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
      <a
        onClick={handleClick}
        className="mb-2 flex h-11 flex-shrink-0 flex-grow cursor-pointer items-center gap-3 rounded-md border border-white/20 px-3 py-3 text-sm text-white transition-colors duration-200 hover:bg-gray-500/10"
      >
        Upload File
      </a>
    </div>
  );
}

export default FileUploadButton;
