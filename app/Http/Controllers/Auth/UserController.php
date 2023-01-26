<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function all()
    {
        $paginate = (int) request()->paginate;
        $status = 1;
        $users = User::where('status', $status)->paginate($paginate);
        return response()->json($users);
    }
}
