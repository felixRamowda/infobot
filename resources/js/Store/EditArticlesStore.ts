import{ create} from 'zustand'
import { ArticleType } from '@/types/ArticlesType';
type State = {
    article: ArticleType  ;
}

type Action = {
    updateArticle: (article: ArticleType)=>void   
}

 const useEditArticleStore = create<State  & Action >((set)=>({
article: {
    id: 0,
  title: '', 
  price:0,
  description: '',
  imageUrl: '', 
},
updateArticle: (article) => set(() =>({article: article})),
}));

export default useEditArticleStore