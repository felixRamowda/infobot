//import Libraries
import React from 'react'
import { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { UseFormReturn } from 'react-hook-form'
//import Types
import { ArticleValidationType } from '@/types/ArticlesType'
import { pre } from 'framer-motion/client'

/**
 * Props for the DropzoneComponent.
 *
 * @interface DropZoneProps
 * @property {Object} accept - The file types that the dropzone will accept.
 * @property {keyof ArticleCreateType} registerName - The name to register the input field with.
 * @property {UseFormReturn<ArticleCreateType>['register']} register - The register function from react-hook-form.
 * @property {UseFormReturn<ArticleCreateType>['setValue']} setValue - The setValue function from react-hook-form.
 */

interface DropZoneProps {
  accept: {}
  registerName: keyof ArticleValidationType
  register: UseFormReturn<ArticleValidationType>['register']
  setValue: UseFormReturn<ArticleValidationType>['setValue']
}

interface FileWithPreview extends File {
  preview: string
}

//prettier-ignore
export default function DropzoneComponent({ accept, registerName, register, setValue }: DropZoneProps) {

  const [preview, setPreview] = React.useState<FileWithPreview[]>([]);
  //Dropzone configuration
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: accept, //Configuration object to determine which file types it accepts!
    onDrop: (acceptedFiles) => {
      setPreview(acceptedFiles.map(file=>Object.assign(file,{ 
        preview: URL.createObjectURL(file) 
      })));
      setValue(registerName, acceptedFiles[0], {  shouldDirty: true });
      
      
    }
  })
  useEffect(() => {
    return () => {
      preview.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [preview]);

  //Accepted Files
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      
    </li>
  ))
  //Rejected Files
  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ))

  const previewImage = preview.map((e ) => (
   
      <img src={e.preview}
      key={e.preview}
       onLoad={() => URL.revokeObjectURL(e.preview)} 
       style={{ width: "150px" }} /> 
    
  ));

  return (
    <>
        <div
          {...getRootProps({
            className: `flex flex-col items-center p-5 border-2 rounded-md border-dashed transition-all duration-200 ${
              files.length > 0 ? 'border-green-500' : 'border-gray-400'
            }`,
            ...register(`${registerName}`)
          })}>
          <input {...getInputProps()}   />
          <p className="font-extrabold p-5">Drag 'n' drop some files here, or click to select files 💾</p>
          <em>(Only *.jpeg and *.png images will be accepted)</em>
          <aside>
           
            {files.length > 0 && (
              <>
                <h4 className="text-green-300">Accepted File:</h4>
                <ul>{files}</ul>
              </>
            )}
            {fileRejectionItems.length > 0 && (
              <>
                <h4 className="text-red-300">Invalid file:</h4>
                <ul>{fileRejectionItems}</ul>
              </>
            )}
          </aside>
          <aside>
            {previewImage}
          </aside>
        </div>
    </>
  )
}
