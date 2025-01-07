<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;


use App\Models\User;

class Article extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'title',
        'price',
        'description',
        'user_id',
    ];
    
    protected $casts = [
        'price' => 'float',
    ];

    //Relationships
    /**
     * Get the user that owns the article.
     *
     * This function defines an inverse one-to-many relationship
     * between the Article and User models.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    /**register Media Collection Article 
     * 
    */

    public function registerMediaCollections(): void 
    {
        $this->addMediaCollection('Article')->singleFile();
        /**
         * you can define as many collections as needed
         */
    }



}
