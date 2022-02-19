<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SelfRegisterRequest extends FormRequest
{

    protected function prepareForValidation () {
        $this->merge( [
            'phone' => str_replace( '_', '_', $this->post( 'phone' ) )
        ] );
    }


    public function messages () {
        return [
            'phone.exists' => trans( 'validation.has_register' ),
        ];
    }


    public function rules () {
        return [ 'name' => 'required|string', 'phone' => 'required|min:11|exists:users,phone' ];
    }

}
