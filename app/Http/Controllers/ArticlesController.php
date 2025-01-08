<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
/**
 * This controller handles the operations related to articles.
 * 
 * It uses the Arr class from the Illuminate\Support namespace.
 */
use Illuminate\Support\Arr; 

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
            $newArticle->addMedia($request->file("imageUrl")[0])
            ->toMediaCollection("Article", "media");
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
        //Colection for Laravel
       // dd($request->toArray());   
        $data = $request->data;
        $data = Arr::only($data,['title','price', 'description']);
        $requestChange=collect($data);
        $articleChange =collect($article);

        /**
         * Compares the differences between the request data and the article data.
         *
         * This method uses the `diffAssoc` function to find the differences between
         * the `$requestChange` and `$articleChange` arrays. The resulting differences
         * are then converted to an array.
         *
         * @param \Illuminate\Http\Request $requestChange The request data to compare.
         * @param array $articleChange The article data to compare.
         * @return array The differences between the request data and the article data.
         */
        $DataChange = $requestChange->diffAssoc($articleChange)->toArray();

       //Definir posibles opciones 
        if(empty($request->data['imageUrl']) && !empty($DataChange)){
            //Cuando llegan solo los datos sin la imagen    
            $article->update($DataChange);
            return back();
        }else if(!empty($request->data['imageUrl']) &&  empty($DataChange)){


            //Cuando llega solo la imagen los demas datos no cambiarion
            /**
             * Handles the media collection for the given article.
             * 
             * - Retrieves the registered media collections for the article.
             * - Gets the current media from the first media collection.
             * - Deletes the current media if it exists.
             * - Adds a new image from the request to the media collection.
             * 
             * @param \App\Models\Article $article The article instance.
             * 
             * @return void
             */
            $nameMediaCollection = $article->getRegisteredMediaCollections();  

            /**
             * Retrieve the current media associated with the article.
             *
             * This method fetches the media collection associated with the article
             * and retrieves the first media item from the collection.
             *
             * @var \App\Models\Article $article The article instance.
             * @var \Illuminate\Support\Collection $MediaCollection The media collection associated with the article.
             * @return \Spatie\MediaLibrary\MediaCollections\Models\Media|null The first media item in the collection, or null if the collection is empty.
             */
            $currentMedia = $article->getMedia($nameMediaCollection->first()->name);

             // Eliminar la imagen actual
             if ($currentMedia->isNotEmpty()) {
                $currentMedia->first()->delete();
            }

            // Agregar la nueva imagen
        
            $article->addMediaFromRequest('data.imageUrl')->toMediaCollection($nameMediaCollection->first()->name);
            
            return back();
        }else {
            $article->update($DataChange);// update data
            //update File image 
            $nameMediaCollection = $article->getRegisteredMediaCollections();  
            $currentMedia = $article->getMedia($nameMediaCollection->first()->name);
            if ($currentMedia->isNotEmpty()) {
                $currentMedia->first()->delete();
            }
            $article->addMediaFromRequest('data.imageUrl')->toMediaCollection($nameMediaCollection->first()->name);

            return back();

        }

       


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        //
    }
}
