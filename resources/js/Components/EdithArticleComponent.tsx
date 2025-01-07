import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Image
} from "@nextui-org/react";
import FormEditArticle from "./FormEditArticle";
import { useEffect } from "react";
import {Textarea} from "@nextui-org/input";
import {Input} from "@nextui-org/input";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from '@inertiajs/react'
import { ArticleCreateType, ArticlesType, ArticleType } from "@/types/ArticlesType";
import {ArticleCreateSchema} from "@/Schemas/ArticlesCreate"; 
import { ArticleSchema } from "@/Schemas/ArticlesSchema";
import { object } from "zod";

export default function App({ isOpen, onOpen, onOpenChange}:{ isOpen: boolean, onOpen: ()=>void, onOpenChange: ()=>void}) {
 

  return (
    <>
      {/* <Button onPress={onOpen}>Edit</Button>  */}
      <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange} size="xl" scrollBehavior="inside" backdrop="opaque" classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }} >
        <ModalContent>
          {(onClose) => (

            <>
              <ModalHeader className="flex flex-col gap-1">Edit Article</ModalHeader>
              <ModalBody>
              <FormEditArticle
              onClose = {onClose}
              />
              </ModalBody>             
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
