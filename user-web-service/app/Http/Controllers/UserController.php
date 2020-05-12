<?php

namespace App\Http\Controllers;

use App\Http\Resources\User as UserResource;
use App\Http\Resources\UserCollection;
use App\Repositories\RepositoryInterface;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $userRepo;
    public function __construct(RepositoryInterface $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    public function index() {
        return new UserCollection($this->userRepo->getAll());
    }

    public function show(Request $request) {
        return new UserResource($this->userRepo->find($request->id));
    }

    public function store(Request $request)
    {

        $request->validate([
            'username' => 'required',
            'password' => 'required',
            'per'      => 'required',
            'status'   => 'required'
        ]);
        if ($request->currentPer >= 3 || ($request->currentPer != 1 && $request->currentPer >= $request->per)) {
            return response()->json('Permission\'s forbidden', 200);
        }
        if ($this->userRepo->checkUser($request->username)){
            return response()->json('Username has been taken', 200);
        }
        if ($this->userRepo->create($request->username, $request->password, $request->per, $request->status)) {
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
        $tmpId = $this->userRepo->getIdByUsername($request->username);
        if ($tmpId != null && $tmpId != $request->id) {
            return response()->json('Username has been taken', 200);
        }
        if ($this->userRepo->getPer($request->currentId) != 1 && $this->userRepo->getPer($request->id) != $request->per) {
            return response()->json('Permission\'s forbidden', 200);
        }
        if ($this->userRepo->update($request->id, $request->username, $request->password, $request->per, $request->status)) {
            return response()->json('Updated', 200);
        } else{
            return response()->json($request, 400);
        }
    }
    public function delete(Request $request)
    {
        $result = $this->userRepo->delete($request->id);
        if ($result) {
            return response()->json('User\'s deleted', 204);
        } else {
            return response()->json('Somgthing\'s wrong', 200);
        }
    }
}
