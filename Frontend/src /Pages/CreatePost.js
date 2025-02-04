import { useDropzone } from 'react-dropzone';

const PostForm = () => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone();

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here...</p>
            ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
            )}
        </div>
    );
};
