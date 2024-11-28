import { create } from "zustand";
import {ArticlesType } from "@/types/ArticlesType"; //State

type State = {
    articles: ArticlesType | null
}

type Action = {
  setArticles: (articles: ArticlesType)=> void;
}
const  useArticlesStore = create<State & Action>((set)=>({
 articles: [],
 setArticles: (articles) => set({articles: articles}),
}));

export default useArticlesStore

