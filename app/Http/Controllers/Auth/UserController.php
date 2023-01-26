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
        $orderBy = request()->orderBy;
        $orderByType = request()->orderByType;

        $status = 1;
        if (request()->has('status')) {
            $status = request()->status;
        }

        $query = User::where('status', $status)->orderBy($orderBy,$orderByType);

        if (request()->has('search_key')) {
            $key = request()->search_key;
            $query->where(function($q) use($key) {
                return $q->where('first_name',$key)
                    ->orWhere('last_name',$key)
                    ->orWhere('user_name',$key)
                    ->orWhere('email',$key)
                    ->orWhere('mobile_number',$key)
                    ->orWhere('status',$key)
                    ->orWhere('first_name','LIKE','%'.$key.'%')
                    ->orWhere('last_name','LIKE','%'.$key.'%')
                    ->orWhere('user_name','LIKE','%'.$key.'%')
                    ->orWhere('email','LIKE','%'.$key.'%')
                    ->orWhere('mobile_number','LIKE','%'.$key.'%')
                    ->orWhere('status','LIKE','%'.$key.'%');
            });
        }

        $users = $query->paginate($paginate);
        return response()->json($users);
    }
}
