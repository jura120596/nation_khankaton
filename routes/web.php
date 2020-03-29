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

Route::resource('admin/spheres', 'Admin\SpheresController')->middleware('auth:web');
Route::resource('admin/projects', 'Admin\ProjectsController')->middleware('auth:web');
Route::resource('bag-colors', 'Admin\BagColorsController')->middleware('auth:web');
Route::resource('newses', 'Admin\NewsController')->middleware('auth:web');
Route::resource('pictures', 'Admin\PicturesController')->middleware('auth:web');

Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');
