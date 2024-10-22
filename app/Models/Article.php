<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User;

class Article extends Model
{
    use HasFactory;

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

}
