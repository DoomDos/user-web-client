<?php


namespace App\Repositories\Users;

use App\Repositories\EloquentRepository;
use App\User;

class UserRepository extends EloquentRepository
{

    public function getModel()
    {
       return \App\User::class;
    }
}
