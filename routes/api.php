<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//Route::get('/sd', '\App\Http\Controllers\Api\V1\ClientsController@list');
Route::namespace('Api')->name('api.')->group(function () {
    Route::namespace('V1')->name('v1.')->prefix('v1')->group(function () {
        Route::namespace('Auth')->name('auth.')->prefix('auth')->group(function () {
            Route::post('identify', 'SessionsController@identify')->name('identify');
            Route::post('signin', 'SessionsController@signin')->name('signin');

            Route::middleware('auth:api')->group(function () {
                Route::post('signout', 'SessionsController@signout')->name('signout');
                Route::post('refresh', 'SessionsController@refresh')->name('refresh');
                Route::post('user', 'SessionsController@user')->name('user');
            });

            Route::name('password.')->prefix('password')->group(function () {
                Route::post('request', 'ForgotPasswordController@sendResetLinkEmail')->name('request');
                Route::patch('reset/{token}', 'ResetPasswordController@reset')->name('reset');
            });
        });
        Route::prefix('clients')->group(function () {
            Route::post('/register', 'ClientsController@register')->middleware('auth:api');
            Route::get('', 'ClientsController@list')->middleware('auth:api');
            Route::get('/{type}/{string}', 'ClientsController@list')->middleware('auth:api');
            Route::get('/{id}', 'ClientsController@show')->middleware('auth:api');
            Route::post('/push', 'ClientsController@SendPush')->middleware('auth:api');
            Route::post('/push/{id}', 'ClientsController@SendPush')->middleware('auth:api');
            Route::get('/change/{id}/{type}/{value}', 'ClientsController@changeField')->middleware('auth:api');
            Route::patch('/{id}', 'ClientsController@update')->middleware('auth:api');;
            Route::delete('/{id}', 'ClientsController@delete')->middleware('auth:api');;
            // Route::post('/register', 'ClientsController@register');

        });

        Route::middleware('auth:api')->group(function () {
            Route::namespace('Settings')->prefix('settings')->name('settings.')->group(function () {
                Route::patch('profile', 'ProfileController@update')->name('profile');
                Route::get('/{type}', 'SettingsController@getOptions')->name('getOptions');
                Route::post('/{type}', 'SettingsController@save')->name('save');

                Route::prefix('account')->name('account.')->group(function () {
                    Route::patch('password', 'AccountController@updatePassword')->name('password');
                    Route::patch('credentials', 'AccountController@updateCredentials')->name('credentials');
                });
            });

            Route::resource('users', 'UsersController', ['except' => ['edit', 'create']]);
            Route::prefix('users')->name('users.')->group(function () {
                Route::patch('{user}/restore', 'UsersController@restore')->name('restore');

                Route::prefix('{user}/avatar')->name('avatar.')->group(function () {
                    Route::post('/', 'UsersController@storeAvatar')->name('store');
                    Route::delete('/', 'UsersController@destroyAvatar')->name('destroy');
                });
            });
            Route::prefix('wallet')->group(function () {
                Route::prefix('layouts')->group(function () {
                    Route::post('/create', 'Card\CardController@createLayout')->middleware('auth:api');
                    Route::get('', 'Card\CardController@layoutsList')->middleware('auth:api');
                    Route::delete('/{id}', 'Card\CardController@deleteLayout')->middleware('auth:api');
                    Route::get('/{id}', 'Card\CardController@showLayout')->middleware('auth:api');
                    Route::patch('/{id}', 'Card\CardController@updateLayout')->middleware('auth:api');

                });
            });
        });
    });
    Route::prefix('pass')->group(function () {
        Route::prefix('apple')->group(function () {
            Route::post('/create', 'Card\CardController@createLayout');
            Route::get('', 'Card\CardController@layoutsList');
            Route::delete('/{id}', 'Card\CardController@deleteLayout');
            Route::get('/{id}', 'Card\CardController@showLayout');
            Route::patch('/{id}', 'Card\CardController@updateLayout');
        });

    });
});



