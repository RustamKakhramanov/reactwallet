<?php

namespace App\Http\Requests;
use Illuminate\Http\Response;
use App\Traits\WalletFields;
use Illuminate\Foundation\Http\FormRequest;

class ClientRequest extends FormRequest
{
    use WalletFields;

    //public $errors  = [];

    public function validateClient($update = false){
        $post = $this->post();
        // if(strlen($post['phone']) !== 11)
        //     $this->errors['phone'] = trans('validation.number_all_required');
        // if(!isset($post['name']) || ! $post['name'])
        //     $this->errors['name'] = trans('validation.name_required');
        if(strlen(str_replace('_', '', $post['phone'])) !== 17){
            return trans('validation.number_all_required');
        }
        if(!isset($post['name']) || !$post['name']) {
            return trans('validation.name_required');
        }

        return false;
    }

    public function authorize()
    {
        return true;
    }

    public function rules(){
        return [
        ];
    }

    public function validate()
    {
        return  $this->validateClient($this->post('_method') === 'PATCH' ? true : false);
//        return $this->errors;

    }

}
