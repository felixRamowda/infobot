import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from '@inertiajs/react'
import { useDropzone } from 'react-dropzone'
//components
import { Textarea, Input, Image, Button } from '@nextui-org/react'
import DropzoneComponent from '@/Components/DropzoneComponent'
//Types and Zod
import { ArticleValidationSchema } from '@/Schemas/ArticlesCreate'
import { ArticleValidationType } from '@/types/ArticlesType'
//Store Zustand
import useEditArticleStore from '@/Store/EditArticlesStore'
import { log } from 'node:console'

export default function FormEditArticle({ onClose }: { onClose: () => void }) {
  //Store Zustand
  const StoreArticle = useEditArticleStore((state) => state.article)
  //react-hook-form
  //prettier-ignore
  const { register, handleSubmit, watch,  setValue, formState: { isDirty } } = useForm<ArticleValidationType>({
    resolver: zodResolver(ArticleValidationSchema),
  });

  //watch data form
  const DataForm = watch()
  console.log(DataForm);
  console.log(isDirty)  ;
  
  const onSubmit = (data: ArticleValidationType) => {
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
    <form
      className="flex flex-col gap-y-6"
      onSubmit={handleSubmit(onSubmit)}
      method="put"
      encType="multipart/form-data">
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
      <DropzoneComponent
        accept={{ 'image/jpeg': ['.jpg'], 'image/png': ['.png'] }}
        registerName="imageUrl"//keyof ArticleCreateType: {...register("imageUrl")}
        register={register}
        setValue={setValue}
      />
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
