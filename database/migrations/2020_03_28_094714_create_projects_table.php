<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('spheres', function (Blueprint $table) {
            $table->timestamp('start')->nullable();
            $table->timestamp('end')->nullable();
            $table->text('target');
        });
        Schema::create('projects', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('type');
            $table->string('title');
            $table->text('content');
            $table->boolean('enabled')->default(false);
            $table->unsignedBigInteger('sphere_id');
            $table->foreign('sphere_id')
                ->references('id')
                ->on('spheres')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->timestamps();
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
            $table->dropColumn(['start', 'end', 'target']);
        });
        Schema::dropIfExists('projects');
    }
}
