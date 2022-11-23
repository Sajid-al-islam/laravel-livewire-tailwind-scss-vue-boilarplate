<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserRole;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UserRole::truncate();

        $user_role = new UserRole();
        $user_role->name = 'admin';
        $user_role->role_serial = 1;
        $user_role->save();

        User::truncate();

        $user = new User();
        $user->first_name = 'super';
        $user->last_name = 'admin';
        $user->user_name = 'admin';
        $user->telegram_id = '812239513';
        $user->role_id = 1;
        $user->mobile_number = '01646343015';
        $user->email = 'admin@gmail.com';
        $user->password = Hash::make('12345678');
        $user->save();

    }
}
