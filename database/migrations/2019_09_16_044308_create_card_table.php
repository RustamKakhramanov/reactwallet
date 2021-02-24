<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
class CreateCardTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cards', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('client_id')->nullable();
            $table->foreign('client_id')->references('id')->on('clients');
            $table->unsignedBigInteger('layout_id')->nullable();
            $table->foreign('layout_id')->references('id')->on('layouts');
            $table->string('pass_type_identifier');
            $table->string('serial_number');
            $table->string('authentication_token');
            $table->json('jsonData')->nullable();
            $table->boolean('transactions')->default(false);
            $table->boolean('updated')->default(false);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });
        DB::statement("ALTER TABLE cards ADD data LONGBLOB");

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('card');
    }
}
