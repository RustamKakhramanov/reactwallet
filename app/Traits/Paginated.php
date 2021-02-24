<?php


namespace App\Traits;


use App\User;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

trait Paginated
{
    protected function paginatedQuery(Request $request) : LengthAwarePaginator
    {
        $users = User::orderBy(
            $request->input('sortBy') ?? 'firstname',
            $request->input('sortType') ?? 'ASC'
        );

        if ($type = $request->input('type')) {
            $this->filter($users, 'type', $type);
        }

        if ($name = $request->input('name')) {
            $this->filter($users, 'name', $name);
        }

        if ($email = $request->input('email')) {
            $this->filter($users, 'email', $email);
        }
        if ($email = $request->input('organization_name')) {
            $this->filter($users, 'organization_name', $email);
        }

        return $users->paginate($request->input('perPage') ?? 10);
    }
}
