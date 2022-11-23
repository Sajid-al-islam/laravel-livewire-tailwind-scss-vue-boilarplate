<?php

use App\Http\Controllers\Auth\ApiLoginController;
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

Route::get('/get-token','Auth\ApiLoginController@get_token');
// Route::get('/get-token',[ApiLoginController::class,'get_token']);

Route::get('/test',function(){
    $user = \App\Models\User::first();
    auth()->login($user);
    dd(
        auth()->check(),
        $user->roles()->toSql() ,
        $user->toArray(),$user->roles()->get()->toArray(),
        $user->toArray(),$user->permissions()->get()->toArray(),
    );
});

Route::get('/data-reload', function () {
    \Illuminate\Support\Facades\Artisan::call('migrate:fresh', ['--seed' => true]);
    \Illuminate\Support\Facades\Artisan::call('migrate', ['--path' => 'vendor/laravel/passport/database/migrations', '--force' => true]);
    \Illuminate\Support\Facades\Artisan::call('passport:install');
    return redirect()->back();
});
