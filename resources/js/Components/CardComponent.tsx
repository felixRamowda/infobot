import { useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/modal";
import { Image } from "@nextui-org/image";
import { ArticlesType } from "@/types/ArticlesType";
import { ArticleType } from "@/types/ArticlesType";
import useEditArticleStore from "@/Store/EditArticlesStore";
import EdithArticlesComponent from "./EdithArticleComponent";

export default function CardComponent({ Articles }: { Articles: ArticlesType }) {
 const { isOpen, onOpen, onOpenChange } = useDisclosure();

 const updateArticle = useEditArticleStore((state) => state.updateArticle);

 const handlerEditArticle = ({ article }: { article: ArticleType }) => {
  updateArticle(article);
  onOpen();
 };
 const editArticleStore = useEditArticleStore((state) => state.article);

 return (
  <div className="p-5 gap-5 grid  sm:grid-cols-4 grid-cols-1  w-[90%] rounded-lg">
   {Articles.map((article, index) => (
    <Card
     shadow="sm"
     key={article.id}
     isPressable
     onPress={() => {
      console.log("ok");
     }}>
     <CardHeader className="p-2 px-4 flex-col items-start">
      <h4 className="font-bold text-large">{article.title}</h4>
      <p className="uppercase ">{`$${article.price}`}</p>
      <small>{article.description}</small>

      <Divider />
     </CardHeader>
     <CardBody className="overflow-visible p-2">
      <Image isZoomed shadow="sm" radius="lg" height={150} width={270} alt={article.title} className="w-full object-cover m-auto" src={article.imageUrl} />
     </CardBody>
     <CardFooter className="text-small justify-between pb-1">
      <Button>Send</Button>
      <Button
       color="primary"
       variant="flat"
       onPress={() => {
        handlerEditArticle({ article });
       }}>
       Edit
      </Button>
     </CardFooter>
    </Card>
   ))}

   {Object.keys(editArticleStore).every((key) => editArticleStore[key as keyof typeof editArticleStore] != "") && (
    <EdithArticlesComponent //Esto es un modal
     isOpen={isOpen}
     onOpen={onOpen}
     onOpenChange={onOpenChange}
    />
   )}
  </div>
 );
}
