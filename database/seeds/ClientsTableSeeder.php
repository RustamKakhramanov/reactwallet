<?php

use App\Client;
use Illuminate\Database\Seeder;

class ClientsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $client = new Client();
        $client->name = 'Андрей Ануфьев';
        $client->phone = '87713609821';
        $client->discount = 5;
        $client->balance = 1200;
        $client->save();
    }
}
