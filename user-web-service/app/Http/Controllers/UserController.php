<?php

namespace App\Http\Controllers;

use App\Http\Resources\User as UserResource;
use App\Http\Resources\UserCollection;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index() {
        return new UserCollection(User::all());
    }

    public function show($id) {
        return new UserResource(User::findOrFail($id));
    }
    public function store(Request $request)
    {

        $request->validate([
            'username' => 'required',
            'password' => 'required',
            'per'      => 'required',
            'status'   => 'required'
        ]);
        if (User::addUser($request->username, $request->password, $request->per, $request->status)) {
            return response()->json('Created', 201);
        } else{
            return response()->json($request, 400);
        }

    }
    public function update(Request $request){
        $request->validate([
            'username' => 'required',
            'password' => 'required',
            'per'      => 'required',
            'status'   => 'required'
        ]);
        if (User::updateUser($request->id, $request->username, $request->password, $request->per, $request->status)) {
            return response()->json('Updated', 200);
        } else{
            return response()->json($request, 400);
        }
    }
    public function delete($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(null, 204);
    }
}
