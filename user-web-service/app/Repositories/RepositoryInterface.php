<?php


namespace App\Repositories;


interface RepositoryInterface
{
    public function getAll();

    public function find($id);

    public function create($username, $password, $per, $status);

    public function update($id, $username, $password, $per, $status);

    public function delete($id);

    public function getIdByUsername($user);

    public function checkUser($user);

    public function checkPassword($id,$pass);
}
