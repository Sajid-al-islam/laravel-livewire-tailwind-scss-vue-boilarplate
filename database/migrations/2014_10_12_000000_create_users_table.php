<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name',100)->nullable();
            $table->string('last_name',100)->nullable();
            $table->string('user_name',100)->nullable()->unique();
            $table->integer('role_id')->default(6); //subscriber

            $table->string('telegram_id',100)->nullable();
            $table->text('telegram_name')->nullable();

            $table->string('mobile_number',100)->nullable()->unique();
            $table->string('photo')->nullable()->default('avatar.png');
            $table->string('email')->unique();

            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('slug',30)->nullable();

            $table->tinyInteger('status')->default(1);

            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('role_user', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->nullable();
            $table->bigInteger('role_serial')->nullable();

            $table->rememberToken();
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
        Schema::dropIfExists('users');
        Schema::dropIfExists('role_user');
    }
}
