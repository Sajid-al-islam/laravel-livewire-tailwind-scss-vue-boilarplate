<?php

use App\Http\Livewire\Login;
use App\Http\Livewire\Register;
use App\Http\Livewire\ShowPosts;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', ShowPosts::class);
Route::get('/login', Login::class);
Route::get('/register', Register::class);

Route::get('/admin',function(){
    return view('backend.dashboard');
});

Route::get('/test',function(){
    $user = \App\Models\User::first();
    dd($user->roles()->get());
});
