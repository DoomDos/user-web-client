<?php


namespace App\Repositories;


use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Support\Facades\DB;

abstract class EloquentRepository implements RepositoryInterface
{
    protected $model;

    public function __construct()
    {
        $this->setModel();
    }

    abstract public function getModel();
    public function setModel()
    {
        try {
            $this->model = app()->make(
                $this->getModel()
            );
        } catch (BindingResolutionException $e) {
        }
    }
    public function getAll()
    {
        return $this->model->all();
    }

    public function find($id)
    {
        $result = $this->model->find($id);

        return $result;
    }

    public function create($username, $password, $per, $status)
    {
        if (self::checkUser($username)){
            return false;
        } else {
            $result = DB::table('user')->insert([
                    'username' => $username,
                    'password' => $password,
                    'per' => $per,
                    'status' => $status
                ]
            );
            return $result;
        }
    }
    public function update($id, $username, $password, $per, $status)
    {
        $result = DB::table('user')->where('id', $id)->update([
                'username' => $username,
                'password' => $password,
                'per' => $per,
                'status' => $status
            ]
        );
        return $result;
    }

    public function delete($id)
    {
        $result = $this->find($id);
        if ($result) {
            $result->delete();

            return true;
        }

        return false;
    }
    public function getIdByUsername($user){
        $result = DB::table('user')->where('username', $user)->select('id')->first();
        return $result->id;
    }

    public function getPer($id){
        $result = DB::table('user')->where('id', $id)->select('per')->first();
        return $result->per;
    }

    public function checkUser($user){
        $check = DB::table('user')->where('username', $user)->first();
        if ($check != null){
            return true;
        }
        return false;
    }
    public function checkPassword($id,$pass){
        $check = DB::table('user')->where('id', $id)->where('password', $pass)->first();
        if ($check != null){
            return true;
        }
        return false;
    }
}

