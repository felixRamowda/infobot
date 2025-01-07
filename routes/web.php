<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticlesController;
use Inertia\Inertia;

Route::get('/', function () {
    if (Auth::check()) {
        // Si el usuario está autenticado, redirigir a la página principal o dashboard
        return redirect('/articles');
    } else {
        // Si el usuario no está autenticado, redirigir a la página de login
        return redirect('/login');
    }
}); 

Route::resource('/articles', ArticlesController::class)
      ->middleware(['auth', 'verified']);
      

Route::get('/Message', function () {
    return Inertia::render('Message');
})->middleware(['auth', 'verified'])->name('message.index');  


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
