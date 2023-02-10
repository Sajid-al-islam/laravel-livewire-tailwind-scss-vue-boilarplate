<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserRoleController extends Controller
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

        $query = UserRole::where('status', $status)->orderBy($orderBy, $orderByType);

        if (request()->has('search_key')) {
            $key = request()->search_key;
            $query->where(function ($q) use ($key) {
                return $q->where('id', $key)
                    ->orWhere('name', $key)
                    ->orWhere('role_serial', $key)
                    ->orWhere('name', 'LIKE', '%' . $key . '%')
                    ->orWhere('created_at', 'LIKE', '%' . $key . '%')
                    ->orWhere('updated_at', 'LIKE', '%' . $key . '%')
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
            'name' => ['required'],
            'role_serial' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = new UserRole();
        $user->name = request()->name;
        $user->role_serial = request()->role_serial;
        $user->save();

        return response()->json($user, 200);
    }

    public function canvas_store()
    {
        $validator = Validator::make(request()->all(), [
            'name' => ['required', 'unique:user_roles'],
            'role_serial' => ['required', 'unique:user_roles'],
        ], [
            'name.unique'=>"already taken. try except : ". UserRole::select('name')->get()->implode('name', ' , '),
            'role_serial.unique' => "already taken. try except : ". UserRole::select('role_serial')->get()->implode('role_serial', ' , '),
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = new UserRole();
        $user->name = request()->name;
        $user->role_serial = request()->role_serial;
        $user->save();

        return response()->json($user, 200);
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
