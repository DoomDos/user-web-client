<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\RepositoryInterface;

class LoginController extends Controller
{

    protected $repos;
    public function __construct(RepositoryInterface $repos)
    {
        $this->repos = $repos;
    }

    public function login(Request $request) {
        if ($this->repos->checkUser($request->username)) {
            $tmpId = $this->repos->getIdByUsername($request->username);
            if ($this->repos->checkPassword($tmpId, $request->password)) {

                $data = [
                        'id'         => $tmpId,
                        'username'   => $request->username,
                        'permission' => $this->repos->getPer($tmpId)
                ];
                return $this->respondWithToken($data);
            }
            else
                return response()->json('Check Username or Password',200);
        } else {
            return response()->json('Check Username or Password',200);
        }
    }

    protected function respondWithToken($token) {
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth()->factory()->getTTL() * 60
        ], 200);
    }
}
