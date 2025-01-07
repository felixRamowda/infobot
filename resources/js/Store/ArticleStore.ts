import { create } from "zustand";
import {ArticlesType } from "@/types/ArticlesType"; //State

type State = {
    article: ArticlesType | null
}

type Action = {
  setArticles: (article: ArticlesType)=> void;
}
const  useArticlesStore = create<State & Action>((set)=>({
 article: [],
 setArticles: (article) => set({article: article}),
}));

export default useArticlesStore

