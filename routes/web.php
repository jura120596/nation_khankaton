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

Route::get('/main', 'Controller@main')->name('root');
Route::resource('admin/spheres', 'Admin\SpheresController');
Route::resource('admin/projects', 'Admin\ProjectsController');
Route::resource('bag-colors', 'Admin\BagColorsController');
Route::resource('newses', 'Admin\NewsController');
Route::resource('pictures', 'Admin\PicturesController');
