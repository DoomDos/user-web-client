<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class LoginController extends Controller
{

    public function login(Request $request)
    {
        if (User::checkUser($request->username)) {
            if (User::checkPassword($request->username,$request->password)) {

                $data = [
                        'id'         => User::getIdByUsername($request->username)->id,
                        'username'   => $request->username,
                        'permission' => User::getPermission($request->username)->per,
                        'token'      => 'fake token'
                ];
                return response()->json($data, 200);
            }
            else
                return response()->json('',401);
        } else {
            return response()->json('',401);
        }
    }
}
