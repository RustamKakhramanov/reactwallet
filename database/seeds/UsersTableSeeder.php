<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User;
        $user->type = 'superuser';
        $user->name = 'Василий никулин';
        $user->username = 'admin';
        $user->email = 'jovert@example.com';
        $user->password = bcrypt('qazwsx12');

        $user->firstname = 'Василий';
        $user->organization_name  = 'Asian | Cosmetic';
        $user->middlename = 'Алексеевич';
        $user->lastname = 'Никулин';
        $user->gender = 'male';
        $user->birthdate = '1998-05-18';
        $user->address = 'Marungko, Angat, Bulacan';
        $user->save();
    }
}
