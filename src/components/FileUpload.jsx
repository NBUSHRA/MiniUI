import React, { useState } from 'react';

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (event) => {
        setFiles([...event.target.files]);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = [...event.dataTransfer.files];
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    };

    const handleUpload = async () => {
        const totalFiles = files.length;

        for (let i = 0; i < totalFiles; i++) {
            const file = files[i];
            const formData = new FormData();
            formData.append('file', file);

            // Simulate upload progress
            for (let percent = 0; percent <= 100; percent += 10) {
                setUploadProgress(percent);
                await new Promise((resolve) => setTimeout(resolve, 100)); // Simulated delay
            }

            // Send file to LLM for processing here
            await uploadFileToLLM(formData);
            setUploadProgress(0);  // Reset progress after upload
        }
    };

    const uploadFileToLLM = async (formData) => {
        // Replace this URL with the actual endpoint.
        const response = await fetch('https://your-llm-endpoint/upload', {
            method: 'POST',
            body: formData,
        });
        return response.json();
    };

    return (
        <div>
            <h1>File Upload</h1>
            <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}
            >
                <p>Drag and drop files here or click to select files</p>
                <input type="file" multiple onChange={handleFileChange} style={{ display: 'none' }} />
            </div>
            <button onClick={handleUpload}>Upload</button>
            <div>
                {files.length > 0 && <h2>File Previews:</h2>}
                <ul>
                    {Array.from(files).map((file, index) => (
                        <li key={index}>{file.name}</li>
                    ))}
                </ul>
                {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
            </div>
        </div>
    );
};

export default FileUpload;