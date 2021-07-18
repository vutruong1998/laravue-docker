<?php

use App\Mail\MailTest;
use App\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redis;
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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/hello', function () {
    $redis = Redis::connection();
    $redis->set('aa', 'cccc');
    // $key = md5(88888888);
    // Cache::store('redis')->put($key, User::take(10)->get(), 40);
    // $users = Cache::get($key);
    // return view('user', compact('users'));
});

Route::get('mail', function () {
    Mail::to('vucongtruong98@gmail.com')->queue(new MailTest());
});