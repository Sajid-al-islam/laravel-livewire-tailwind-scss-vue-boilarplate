<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

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

        $query = User::where('status', $status)->orderBy($orderBy, $orderByType);

        if (request()->has('search_key')) {
            $key = request()->search_key;
            $query->where(function ($q) use ($key) {
                return $q->where('first_name', $key)
                    ->orWhere('last_name', $key)
                    ->orWhere('user_name', $key)
                    ->orWhere('email', $key)
                    ->orWhere('mobile_number', $key)
                    ->orWhere('status', $key)
                    ->orWhere('first_name', 'LIKE', '%' . $key . '%')
                    ->orWhere('last_name', 'LIKE', '%' . $key . '%')
                    ->orWhere('user_name', 'LIKE', '%' . $key . '%')
                    ->orWhere('email', 'LIKE', '%' . $key . '%')
                    ->orWhere('mobile_number', 'LIKE', '%' . $key . '%')
                    ->orWhere('status', 'LIKE', '%' . $key . '%');
            });
        }

        $users = $query->paginate($paginate);
        return response()->json($users);
    }

    public function show($id)
    {
    }

    public function store()
    {
        $validator = Validator::make(request()->all(), [
            'first_name' => ['required'],
            'last_name' => ['required'],
            'user_name' => ['required', 'unique:users'],
            'user_role_id' => ['required','array'],
            'email' => ['required', 'unique:users'],
            'mobile_number' => ['required', 'unique:users'],
            'password' => ['required', 'min:8', 'confirmed'],
            'password_confirmation' => ['required']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        dd( request()->all(), request()->file('photo') );
        $user = new User();
        $user->first_name = request()->first_name;
        $user->last_name = request()->last_name;
        $user->user_name = request()->user_name;
        $user->email = request()->email;
        $user->mobile_number = request()->mobile_number;
        $user->password = Hash::make(request()->password);
        $user->save();

        return response()->json($user, 200);
    }

    public function canvas_store()
    {
        $validator = Validator::make(request()->all(), [
            'name' => ['required'],
            'role_serial' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = new UserRole();
        $data->name = request()->name;
        $data->role_serial = request()->role_serial;
        $data->save();

        return response()->json($data, 200);
    }

    public function update()
    {
    }

    public function soft_delete()
    {
    }

    public function destroy()
    {
    }
}
