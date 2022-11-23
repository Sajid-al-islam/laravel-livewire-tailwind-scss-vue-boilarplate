<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(
    ['prefix' => 'v1'],
    function () {
        Route::group(['prefix' => '/user', 'middleware' => ['guest:api']], function () {
            Route::post('/get-token', 'Auth\ApiLoginController@get_token');
            Route::post('/api-login', 'Auth\ApiLoginController@login');
            Route::post('/api-register', 'Auth\ApiLoginController@register');
            Route::get('/auth-check', 'Auth\ApiLoginController@auth_check');
            Route::post('/forget-mail', 'Auth\ApiLoginController@forget_mail');
            Route::post('/check-code', 'Auth\ApiLoginController@check_code');
            Route::post('/logout-from-all-devices', 'Auth\ApiLoginController@logout_from_all_devices');
        });

        Route::group(['middleware' => ['auth:api']], function () {
            Route::group(['prefix' => 'user'], function () {
                Route::post('/api-logout', 'Auth\ApiLoginController@logout');
                Route::post('/user_info', 'Auth\ApiLoginController@user_info');
                Route::post('/check-auth', 'Auth\ApiLoginController@check_auth');
                Route::post('/find-user-info', 'Auth\ApiLoginController@find_user_info');
            });

            Route::group(['prefix' => 'user'], function () {
                Route::post('/update-profile', 'Auth\ProfileController@update_profile');
            });

            Route::group(['prefix' => 'question-bank'], function () {

                Route::get('/at-a-glance', 'QuestionBank\QuestionBankController@at_a_glance');

                Route::group(['prefix' => 'module'], function () {
                    Route::get('/', 'QuestionBank\ModuleController@all');
                    Route::get('/get-all', 'QuestionBank\ModuleController@get_all');
                    Route::post('/store', 'QuestionBank\ModuleController@store');
                    Route::post('/get/{module}', 'QuestionBank\ModuleController@get');
                    Route::post('/update', 'QuestionBank\ModuleController@update');
                    Route::post('/delete', 'QuestionBank\ModuleController@delete');
                    Route::post('/load-csv', 'QuestionBank\ModuleController@load_csv');
                    Route::post('/store_csv', 'QuestionBank\ModuleController@store_csv');
                    Route::post('/export-all', 'QuestionBank\ModuleController@export_all');
                    Route::post('/export-selected', 'QuestionBank\ModuleController@export_selected');
                    Route::post('/export-and-delete-selected', 'QuestionBank\ModuleController@export_and_delete_selected');
                });

                Route::group(['prefix' => 'chapter'], function () {
                    Route::get('/', 'QuestionBank\ChapterController@all');
                    Route::get('/get-all', 'QuestionBank\ChapterController@get_all');
                    Route::post('/store', 'QuestionBank\ChapterController@store');
                    Route::post('/get/{chapter}', 'QuestionBank\ChapterController@get');
                    Route::post('/update', 'QuestionBank\ChapterController@update');
                    Route::post('/delete', 'QuestionBank\ChapterController@delete');
                    Route::post('/load-csv', 'QuestionBank\ChapterController@load_csv');
                    Route::post('/store_csv', 'QuestionBank\ChapterController@store_csv');
                    Route::post('/export-all', 'QuestionBank\ChapterController@export_all');
                    Route::post('/export-selected', 'QuestionBank\ChapterController@export_selected');
                    Route::post('/export-and-delete-selected', 'QuestionBank\ChapterController@export_and_delete_selected');
                });

                Route::group(['prefix' => 'question'], function () {
                    Route::get('/', 'QuestionBank\QuestionController@all');
                    Route::get('/module-chapter-based-question', 'QuestionBank\QuestionController@module_chapter_based_question');
                    Route::get('/get-all', 'QuestionBank\QuestionController@get_all');
                    Route::get('/get-used-details/{question}', 'QuestionBank\QuestionController@get_used_details');
                    Route::post('/store', 'QuestionBank\QuestionController@store');
                    Route::post('/get/{question}', 'QuestionBank\QuestionController@get');
                    Route::post('/update', 'QuestionBank\QuestionController@update');
                    Route::post('/delete', 'QuestionBank\QuestionController@delete');
                    Route::post('/load-csv', 'QuestionBank\QuestionController@load_csv');
                    Route::post('/store_csv', 'QuestionBank\QuestionController@store_csv');
                    Route::post('/export-all', 'QuestionBank\QuestionController@export_all');
                    Route::post('/export-all-module-based-selected', 'QuestionBank\QuestionController@export_all_module_based_selected');
                    Route::post('/export-all-module-based', 'QuestionBank\QuestionController@export_all_module_based');
                    Route::post('/export-selected', 'QuestionBank\QuestionController@export_selected');
                    Route::post('/export-and-delete-selected', 'QuestionBank\QuestionController@export_and_delete_selected');
                    Route::post('/export-question-by-chapter', 'QuestionBank\QuestionController@export_question_by_chapter');
                    Route::post('/export-question-by-module', 'QuestionBank\QuestionController@export_question_by_module');
                });

                Route::group(['prefix' => 'question-paper'], function () {
                    Route::get('/', 'QuestionBank\QuestionPaperController@all');
                    Route::get('/get-all', 'QuestionBank\QuestionPaperController@get_all');
                    Route::post('/store', 'QuestionBank\QuestionPaperController@store');
                    Route::post('/get/{question_paper}', 'QuestionBank\QuestionPaperController@get');
                    Route::post('/update', 'QuestionBank\QuestionPaperController@update');
                    Route::post('/delete', 'QuestionBank\QuestionPaperController@delete');
                    Route::post('/export', 'QuestionBank\QuestionPaperController@export');
                    Route::post('/load-csv', 'QuestionBank\QuestionPaperController@load_csv');
                    Route::post('/store_csv', 'QuestionBank\QuestionPaperController@store_csv');
                });

                Route::group(['prefix' => 'exam'], function () {
                    Route::get('/', 'QuestionBank\ExamController@all');
                    Route::get('/get-all', 'QuestionBank\ExamController@get_all');
                    Route::post('/store', 'QuestionBank\ExamController@store');
                    Route::post('/get/{exam}', 'QuestionBank\ExamController@get');
                    Route::post('/update', 'QuestionBank\ExamController@update');
                    Route::post('/delete', 'QuestionBank\ExamController@delete');
                    Route::post('/load-csv', 'QuestionBank\ExamController@load_csv');
                    Route::post('/store_csv', 'QuestionBank\ExamController@store_csv');
                });
            });
        });
    }
);
