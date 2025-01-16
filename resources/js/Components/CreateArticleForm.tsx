import { useForm } from 'react-hook-form'
import { router } from '@inertiajs/react'
import { zodResolver } from '@hookform/resolvers/zod'
//Type and Zod
import { ArticleValidationType } from '@/types/ArticlesType'
import { ArticleValidationSchema } from '@/Schemas/ArticlesCreate'
//Components NextUi
import { Button } from '@nextui-org/react'
import { Textarea } from '@nextui-org/input'
import { Input } from '@nextui-org/input'
import DropzoneComponent from './DropzoneComponent'
//TODO: Este componente es el encargado de crear los nuevos Articulos
interface FormComponentProps {
  onClose: () => void
}

export default function CreateArticleForm({ onClose }: FormComponentProps) {
  //react-hook-form configuration
  //prettier-ignore
  const {  register,handleSubmit,setError,watch,setValue, formState: { errors, isDirty } } = useForm<ArticleValidationType>({
    resolver: zodResolver(ArticleValidationSchema)
  })

   const formValues = watch();
   console.log(formValues);

  const onSubmit = (data: ArticleValidationType) => {
    
    router.post(route('articles.store'), data, {
      onSuccess: () => {
      onClose()
      }
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-6">
          <div>
            <Input
              size="lg"
              variant="bordered"
              placeholder="Title"
              isRequired
              {...register('title')}
              style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
            />
            {errors.title && <span>{`${errors.title.message}📌`}</span>}
          </div>
          <div>
            <Input
              isRequired
              type="number"
              size="lg"
              variant="bordered"
              placeholder="Price"
              {...register('price')}
              style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
              classNames={{
                base: 'max-w-xs',
                input: 'resize-y min-h-[40px]'
              }}
            />
            {errors.price && <span>{`${errors.price.message}📌`}</span>}
          </div>
          {/* <div>
            <Input
              isRequired
              {...register('imageUrl')}
              className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
              type="file"
            />
            {errors.imageUrl && <span>{errors.imageUrl.message as string}</span>}
          </div> */}
          <div>
            <DropzoneComponent
              accept={{ 'image/jpeg': ['.jpg'], 'image/png': ['.png'] }}
              registerName="imageUrl"
              register={register}
              setValue={setValue}
            />
          </div>
          <div>
            <Textarea
              isRequired
              size="lg"
              label="Description"
              variant="bordered"
              placeholder="Enter your description"
              disableAnimation
              disableAutosize
              {...register('description')}
              classNames={{
                input: 'resize-y min-h-[40px]'
              }}
              style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
            />
            {errors.description && <span>{`${errors.description.message}📌`}</span>}
          </div>
          <div>
            <Button color="primary" type="submit">
              Crate Product
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}
