<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * This method creates the 'articles' table with the following columns:
     * - id: Primary key, auto-incrementing.
     * - title: A string column to store the title of the article.
     * - price: A float column to store the price of the article.
     * - description: A text column to store the description of the article.
     * - user_id: A foreign key referencing the 'id' column on the 'users' table.
     * - timestamps: Two timestamp columns, 'created_at' and 'updated_at', to track when the article is created and updated.
     *
     * @return void
     */
    public function up(): void
    {
        
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->float('price');
            $table->text('description')->nullable();
            $table->foreignId('user_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
