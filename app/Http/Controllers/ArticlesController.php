<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;




class ArticlesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $userID = auth()->user()->id;
        $user= User::find($userID);
        $articles = $user->articles;
            
        /**
         * Maps through the articles and retrieves media items for each article.
         * Each media item is then mapped to an array containing the article's id, title, price, description, and the media item's URL.
         * The resulting collection is then flattened by one level.
         *
         * @param \Illuminate\Support\Collection $articles Collection of articles to be processed.
         * @return \Illuminate\Support\Collection Flattened collection of articles with their media items.
         */
        $Articles = $articles->map(function($article){
               $mediaItems = $article->getMedia("Article"); 
               return  $mediaItems->map(function($mediaItem) use ($article) {
                    return [
                        
                            "id" => $article->id,
                            "title" =>$article->title,
                            "price" =>$article->price,
                            'description' => $article->description,
                            'imageUrl' => $mediaItem->getUrl(),
                        
                        
                    ];
                   
               });
        });
        $ARTICLES = $Articles->flatten(1);
        return Inertia::render('Articles', [
            'Articles' => $ARTICLES,    
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * Name route: articles.create
     */
    public function create(Request $request)
    {
        //
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //dd($request->toArray());
        $userID = auth()->user()->id;
        if($request->hasFile('imageUrl')){
            $newArticle = Article::create([
                'user_id' => $userID,
                'title' => $request->title,
                'price' => $request->price,
                'description' => $request->description,
            ]); 
            //dd($request->file("imageUrl"));
            $newArticle->addMedia($request->file("imageUrl")[0])->toMediaCollection("Article");
        }
      
    }

    /**,
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        //
    }
}
