import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {router} from '@inertiajs/react'
//components
import { Textarea, Input,Image, Button } from '@nextui-org/react'
//Types and Zod
import { ArticleType } from '@/types/ArticlesType'
import { ArticleCreateSchema } from '@/Schemas/ArticlesCreate'
import { ArticleCreateType } from '@/types/ArticlesType'
//Store Zustand
import useEditArticleStore from '@/Store/EditArticlesStore'

export default function FormEditArticle({onClose}:{onClose: ()=>void}){

    //Store Zustand
    const StoreArticle = useEditArticleStore((state)=>state.article);
   //react-hook-form
    const { register, handleSubmit, watch, reset, setError, formState: {isDirty}  } = useForm<ArticleCreateType>({
        resolver: zodResolver(ArticleCreateSchema),
       });

        const DataForm = watch();
        console.log(DataForm);
         
  const onSubmit = (data: ArticleCreateType) => {
    if(isDirty){
      router.post(route('articles.update', { article: StoreArticle.id }), {
        _method: 'put',
        data: data, 
    },{
      onSuccess: () => {
        onClose();
      }
    });
    }
  
    //onClose();
  };

    return (
        <form 
        className="flex flex-col gap-y-6"
        onSubmit={handleSubmit(onSubmit)}
        method='put'
         >
              <div>
              <label>
                Title
              </label>
                <Input
                          
                  style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                 defaultValue={StoreArticle.title}
                  {...register("title")}
                /> 
                </div>    
              <div>
              <label>
                Price
              </label>
              <Input
                  //value={article.price.toString()}
                  type='number'
                  style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                  defaultValue={StoreArticle.price.toString()}
                  {...register("price")}
                />
              </div>
              <div className="m-auto w-full">
                <Image
                
                height={150}
                width={200}
                src={ StoreArticle.imageUrl}
                />
                 <Input
                isRequired
                className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
                type="file"
                {...register("imageUrl")}
                />
              </div>
              <div>
                <label>
                  Description
                </label>
                <Textarea
                 style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                  defaultValue={StoreArticle.description}
                  {...register("description")}
                />
              </div>
              <div className="flex sm:justify-start">
                {/* <Button type="submit">
                  Delete
                </Button> */}
                <Button type="submit" size="lg" color="primary" variant="flat" className="w-full  sm:right-0">
                  Edit
                </Button>
              
              </div>
             </form>
    )
}