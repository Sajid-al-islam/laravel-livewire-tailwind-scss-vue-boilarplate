<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;

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
        $select = [
            'id',
            'first_name',
            'last_name',
            'user_name',
            'email',
            'mobile_number',
            'photo',
        ];
        if(request()->has('select_all') && request()->select_all){
            $select = "*";
        }
        $user = User::where('id', $id)
            ->select($select)
            ->with([
                'roles' => function ($q) {
                    return $q->select([
                        'user_roles.id',
                        'name',
                        'role_serial'
                    ]);
                },
                'permissions' => function ($q) {
                    return $q->select([
                        'user_permissions.id',
                        'title',
                        'permission_serial'
                    ]);
                },
            ])
            ->first();
        if ($user) {
            return response()->json($user, 200);
        } else {
            return response()->json([
                'err_message' => 'data not found',
                'errors' => [
                    'user' => [],
                ],
            ], 404);
        }
    }

    public function store()
    {
        $validator = Validator::make(request()->all(), [
            'first_name' => ['required'],
            'last_name' => ['required'],
            'user_name' => ['required', 'unique:users'],
            'user_role_id' => ['required', 'array'],
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

        $user = new User();
        $user->first_name = request()->first_name;
        $user->last_name = request()->last_name;
        $user->user_name = request()->user_name;
        $user->email = request()->email;
        $user->mobile_number = request()->mobile_number;
        $user->password = Hash::make(request()->password);
        $user->save();

        if (count(request()->user_role_id))
            $user->roles()->attach(request()->user_role_id);

        try {
            if (request()->hasFile('photo')) {
                $file = request()->file('photo');
                $path = 'uploads/users/pp-' . $user->id . rand(1000, 9999) . '.';
                $height = 200;
                $width = 200;
                if (count($file)) {
                    foreach ($file as $s_file) {
                        $path .= $s_file->getClientOriginalExtension();
                        Image::make($s_file)->fit($height, $width)->save(public_path($path));
                        $user->photo = $path;
                    }
                } else {
                    $path .= $file->getClientOriginalExtension();
                    Image::make($file)->fit($height, $width)->save(public_path($path));
                    $user->photo = $path;
                }
            }
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json("data created without image uploding-" . $th->getMessage(), 500);
        }

        $user->save();

        return response()->json([
            'message' => 'success',
            'result' => $user->id,
        ], 200);
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
        $rules = [
            'id' => ['required'],
            'first_name' => ['required'],
            'last_name' => ['required'],
            'user_name' => ['required'],
            'email' => ['required'],
            'mobile_number' => ['required'],
            'user_role_id' => ['required', 'array'],
        ];

        $user = User::find(request()->id);

        if (request()->has('password') && request()->password) {
            $rules['password'] = ['required', 'min:8', 'confirmed'];
            $rules['password_confirmation'] = ['required'];
        }
        if (request()->email != $user->email) {
            $rules['email'][] = 'unique:users';
        }
        if (request()->mobile_number != $user->mobile_number) {
            $rules['mobile_number'][] = 'unique:users';
        }
        if (request()->user_name != $user->user_name) {
            $rules['user_name'][] = 'unique:users';
        }

        $validator = Validator::make(request()->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user->first_name = request()->first_name;
        $user->last_name = request()->last_name;
        $user->user_name = request()->user_name;
        $user->email = request()->email;
        $user->mobile_number = request()->mobile_number;
        $user->password = Hash::make(request()->password);
        $user->save();

        if (count(request()->user_role_id))
            $user->roles()->sync(request()->user_role_id);

        try {
            if (request()->hasFile('photo')) {
                $file = request()->file('photo');
                $path = 'uploads/users/pp-' . $user->id . rand(1000, 9999) . '.';
                $height = 200;
                $width = 200;
                if (count($file)) {
                    foreach ($file as $s_file) {
                        $path .= $s_file->getClientOriginalExtension();
                        Image::make($s_file)->fit($height, $width)->save(public_path($path));
                        $user->photo = $path;
                    }
                } else {
                    $path .= $file->getClientOriginalExtension();
                    Image::make($file)->fit($height, $width)->save(public_path($path));
                    $user->photo = $path;
                }
            }
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json("data created without image uploding-" . $th->getMessage(), 500);
        }

        $user->save();

        return response()->json([
            'message' => 'success',
            'result' => $user,
        ], 200);
    }

    public function soft_delete()
    {
        $validator = Validator::make(request()->all(), [
            'id' => ['required','exists:users,id'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::find(request()->id);
        $user->status = 0;
        $user->save();

        return response()->json([
                'result' => 'deactivated',
        ], 200);
    }

    public function destroy()
    {
    }

    public function restore()
    {
        $validator = Validator::make(request()->all(), [
            'id' => ['required','exists:users,id'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'err_message' => 'validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::find(request()->id);
        $user->status = 1;
        $user->save();

        return response()->json([
                'result' => 'activated',
        ], 200);
    }


}
