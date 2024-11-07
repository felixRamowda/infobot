import { ArticleCreateSchema } from "@/Schemas/ArticlesCreate";
import { ArticleCreateType } from "@/types/ArticlesType";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from '@inertiajs/react'
//Components NextUi
import { Button } from "@nextui-org/react";
import {Textarea} from "@nextui-org/input";
import {Input} from "@nextui-org/input";
import TextInput from "./TextInput";

interface FormComponentProps {
    onClose: () => void;
  } 

export default function FormComponent({onClose}: FormComponentProps) { 

    const { register, handleSubmit, setError,watch,formState: { errors } } = useForm<ArticleCreateType>({
        resolver: zodResolver(ArticleCreateSchema),
    });
   
    const formValues = watch();

    //console.log("Form Values:", formValues);
    
    const onSubmit = (data: ArticleCreateType) => {
        const file = data.imageUrl[0]; 
        const allowedExtensions = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
        if (!allowedExtensions.includes(file.type)) {
            setError("imageUrl", {
                type: "manual",
                message: "The selected file must be a .jpg, .png, or .gif image"
            });
            return;
        }

        console.log(data);
        router.post(route('articles.store'),data, {
            onSuccess: ()=>{
                onClose();
            }
        });
    };

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} >
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
                {errors.title&&<span>{errors.title.message}</span>}
                </div>
                <div>
                    <Input
                    type="number"
                    isRequired       
                    size="lg"
                    variant="bordered"
                    placeholder="Price"
                    {...register("price")}
                    style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                    classNames={{
                        base: "max-w-xs",
                        input: "resize-y min-h-[40px]",
                      }}
                    />
                </div>
            <div>
                <Input
                {...register("imageUrl")}
                className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
                type="file"
                required
                />
                {errors.imageUrl && <span>{errors.imageUrl.message as string}</span>}
            </div>
            <Textarea
            size="lg"
             label="Description"
             variant="bordered"
            placeholder="Enter your description"
            disableAnimation
         disableAutosize
         {...register("description")}
         classNames={{
         input: "resize-y min-h-[40px]",
         
         }}
         style={{ border: 'none', outline: 'none', boxShadow: 'none' }}

    />

         <div>
            <Button color="primary"  type="submit">Crate Product</Button>
        </div>
     </div>
    
       

        </form>
        </>
    );
} 