import {Card, CardBody, CardFooter} from "@nextui-org/card";
import {Image} from "@nextui-org/image";
import { ArticlesType } from "@/types/ArticlesType";
import { div } from "framer-motion/client";


export default function CardComponent({Articles}:{Articles: ArticlesType}){
  console.log(Articles);  
    return (
        <div className="p-5 gap-5 grid grid-cols-2 sm:grid-cols-4 bg-white w-[90%] rounded-lg">

             {Articles.map((article, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              isZoomed
              shadow="sm"
              radius="lg"
              width="100%"
              alt={article.title}
              className="w-full object-cover h-[140px]"
              src={article.imageUrl}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{article.title}</b>
            <p className="text-default-500">{article.price}</p>
          </CardFooter>
        </Card>
      ))}
        </div>
    );
}