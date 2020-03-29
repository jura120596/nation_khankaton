<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('files', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('file', 1000);
            $table->string('name', 1000);
        });
        Schema::table('projects', function (Blueprint $table) {
            $table->unsignedBigInteger('passport_file_id')->nullable();
            $table->foreign('passport_file_id')
                ->references('id')
                ->on('files')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('spheres', function (Blueprint $table) {
            $table->unsignedBigInteger('passport_file_id')->nullable();
            $table->foreign('passport_file_id')
                ->references('id')
                ->on('files')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('spheres', function (Blueprint $table) {
            $table->dropColumn('passport_file_id');
        });
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('passport_file_id');
        });
        Schema::dropIfExists('files');
    }
}
