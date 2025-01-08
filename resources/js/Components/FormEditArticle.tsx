import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from '@inertiajs/react'
import { useDropzone } from 'react-dropzone'
//components
import { Textarea, Input, Image, Button } from '@nextui-org/react'
//Types and Zod
import { ArticleType } from '@/types/ArticlesType'
import { ArticleCreateSchema } from '@/Schemas/ArticlesCreate'
import { ArticleCreateType } from '@/types/ArticlesType'
//Store Zustand
import useEditArticleStore from '@/Store/EditArticlesStore'

export default function FormEditArticle({ onClose }: { onClose: () => void }) {
  //Store Zustand
  const StoreArticle = useEditArticleStore((state) => state.article)
  //react-hook-form
  //prettier-ignore
  const { register, handleSubmit, watch, reset, setError, setValue, formState: { isDirty } } = useForm<ArticleCreateType>({
    resolver: zodResolver(ArticleCreateSchema),
  });

  //Config DropZone!
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg'],
      'image/png': ['.png']
    },
    onDrop: (acceptedFiles) => {
      setValue('imageUrl', acceptedFiles[0])
    }
  })
  //Archivos Aceptados de DropZone
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))
  //Archivos Rechazados de DropZone
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

  // const DataForm = watch();
  // console.log(DataForm);

  const onSubmit = (data: ArticleCreateType) => {
    if (isDirty) {
      router.post(
        route('articles.update', { article: StoreArticle.id }),
        {
          _method: 'put',
          data: data
        },
        {
          onSuccess: () => {
            onClose()
          }
        }
      )
    }
  }

  return (
    <form className="flex flex-col gap-y-6" onSubmit={handleSubmit(onSubmit)} method="put">
      <div>
        <label>Title</label>
        <Input
          style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
          defaultValue={StoreArticle.title}
          {...register('title')}
        />
      </div>
      <div>
        <label>Price</label>
        <Input
          type="number"
          style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
          defaultValue={StoreArticle.price.toString()}
          {...register('price')}
        />
      </div>
      <div className="m-auto w-full">
        <Image height={150} width={200} src={StoreArticle.imageUrl} />
      </div>
      <div
        {...getRootProps({
          className: `flex flex-col items-center p-5 border-2 rounded-md border-dashed transition-all duration-200 ${
            files.length > 0 ? 'border-green-500' : 'border-gray-400'
          }`,
          ...register('imageUrl')
        })}>
        <input {...getInputProps()} />
        <p className="font-extrabold p-5">
        Drag 'n' drop some files here, or click to select files 📑
        </p>
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
      </div>
      <div>
        <label>Description</label>
        <Textarea
          style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
          defaultValue={StoreArticle.description}
          {...register('description')}
        />
      </div>
      <div className="flex sm:justify-start">
        {/* <Button type="submit">
          Delete
        </Button> */}
        <Button type="submit" size="lg" color="primary" variant="flat" className="w-full sm:right-0">
          Edit
        </Button>
      </div>
    </form>
  )
}
