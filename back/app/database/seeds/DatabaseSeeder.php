<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UserSeeder::class);
        for ($i = 0; $i <= 10; $i++) {
            DB::table('users')->insert([
                'name' => $i . Str::random(10),
                'email' => Str::random(8) . '@gmail.com',
                'password' => md5(Str::random(8)),
                'created_at' => date('Y-m-d h:i:s'),
                'updated_at' => date('Y-m-d h:i:s')
            ]);
        }
    }
}
