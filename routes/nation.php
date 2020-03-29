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

Route::get('/', 'NationController@nation')->name('nation.main');
Route::get('/materials', 'NationController@docs')->name('nation.docs');
Route::get('/photos', 'NationController@photos')->name('nation.photos');
Route::get('/news', 'NationController@news')->name('nation.news');
Route::get('/contacts', 'NationController@contacts')->name('nation.contacts');
Route::get('/sphere', 'SphereController@sphere')->name('sphere.main');
Route::get('/project', 'ProjectController@project')->name('project.main');
Route::post('/project/step/complete', 'ProjectController@completeStep')->name('project.complete_step');
Route::post('/project/step/add', 'ProjectController@addStep')->name('project.add_step');
Route::post('/project/step/add/photo', 'ProjectController@addStepPhoto')->name('project.add_step_photo');
Route::post('/project/step/delete', 'ProjectController@deleteStep')->name('project.delete_step');
Route::get('/admin', 'NationController@manager')->name('manager');
