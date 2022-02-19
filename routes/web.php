<?php

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
use Illuminate\Support\Facades\Route;

Route::prefix('/{locale?}')->where(['locale' => 'en|fil|ru'])->group(function () {
    Route::name('backoffice.')->group(function () {
        Route::get('/', function () {
            return view('__backoffice.welcome');
        })->name('welcome');
    });
});

Route::get('/layouts/download-test/{id}','Api\V1\Card\CardController@createTestCard');
Route::get('/download-card/{id}','Api\V1\Card\CardController@download');
Route::get('/test/{id}', 'Api\V1\ClientsController@test');
Route::get('/test/{id}/{type}', 'Api\V1\ClientsController@changeType');
Route::get('/dd', 'Api\V1\ClientsController@testReg');
Route::match(['get', 'post'],'/signup/{id}', 'Api\V1\ClientsController@selfRegister');

Route::get('/pop', function (){
   echo bcrypt('testPass');

});
