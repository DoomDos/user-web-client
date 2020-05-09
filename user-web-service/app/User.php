<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class User extends Model
{
    protected $table = 'user';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id','username', 'per', 'status'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
    ];

    static function getIdByUsername($user){
        $result = DB::table('user')->where('username', $user)->select('id')->first();
        return $result;
    }
    static function checkUser($user){
        $check = DB::table('user')->where('username', $user)->first();
        if ($check != null){
            return true;
        }
        return false;
    }
    static function checkPassword($user,$pass){
        $check = DB::table('user')->where('username', $user)->where('password', $pass)->first();
        if ($check != null){
            return true;
        }
        return false;
    }
    static function getPermission($user){
        $result = DB::table('user')->where('username', $user)->select('per')->first();
        return $result;
    }
    static function addUser($username, $password, $per, $status){
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
    static function updateUser($id, $username, $password, $per, $status){
        if (self::checkUser($username)){
            $result = DB::table('user')->where('id', $id)->update([
                    'username' => $username,
                    'password' => $password,
                    'per' => $per,
                    'status' => $status
                ]
            );
            return $result;
        } else
            return false;
    }
}
