<?php

namespace App\Http\Requests;
use Illuminate\Http\Response;
use App\Traits\WalletFields;
use Illuminate\Foundation\Http\FormRequest;

class WalletCardRequest extends FormRequest
{
    use WalletFields;

    public $errors  = [];

    public function validateLayout($update = false){
        $post = $this->post();
        $this->errors += $this->imagesValidate($post['card']['type'], $update);

        if(!$post['card']['title'])
            $this->errors['card']['title'] = trans('validation.wallet.title');
        if(!$post['barcode']['altText'])
            $this->errors['barcode']['altText'] = trans('validation.wallet.altText');

        if(isset($post['backFields']) && $this->backSideValidate($post['backFields']))
            $this->errors['backFields'] = trans('validation.wallet.backSide');

        $post = self::unsetElem($post, ['barcode', 'backFields', 'card', '_method', 'locations']);
         if($this->uniqueKeysValidate($post))
            $this->errors['uniqueKeys'] = trans('validation.wallet.uniqueKeys');

        foreach ($post as $key => $value){
            foreach ($value as $index => $item){
                if($key == 'auxiliaryFields' || $key == 'headerFields'){
                    if(!$item['key'] || !$item['label'])
                        $this->errors[$key][$index] = trans('validation.wallet.required');
                }
                if($item['key']  !== 'name' && $item['key']  !== 'date' && $item['key']  !== 'discount' && $item['key']  !== 'balance' && $item['key']){
                    if(!$item['value'] || !$item['label'] || !$item['changeMessage'])
                        $this->errors[$key][$index] = trans('validation.wallet.static');
                }
                if($item['key']  == 'date' && !$item['value'] ){
                    $this->errors[$key][$index] = trans('validation.wallet.date');
                }
            }
        }
    }

    protected function  backSideValidate($backside){
        foreach ($backside as $key => $item){
            if($key !== 'owner'){
                if(!$item['value'] ||  !$item['label']){
                    return true;
                }
            }
        }
    }

    protected function  uniqueKeysValidate($array){
        $keysArray = [];
        $validArray = [];
        foreach ($array as $key => $value){
            foreach ($value as $index => $item){
                $keysArray[] =  $item['key'];
            }
        }
        $count = count($keysArray);
        for ($i = 0; $i < $count; $i++)
            for ($k = $i+1; $k < $count; $k++)
                if ($keysArray[$i] == $keysArray[$k]) $validArray[$i] = $keysArray[$k];
        if (count($validArray) > 0)
            return true;
    }

    protected function  imagesValidate($type, $update){
        $imagesArray = [
            'headerLogo',
            'stripImage',
        ];
        $errors = [];
        if($type === 'thumbnail'){
            $imagesArray[] = 'thumbnailImage';
        }
        foreach ($imagesArray as $item){
            $image = $this->file($item);
            if(!$image){
                if(!$update)
                    $errors['images'] = trans('validation.wallet.images');
            }
            else{
                $format = $image->getClientOriginalExtension();
                if(_not_image_format($format))
                    $errors[$item] = trans('validation.wallet.imagesFormat');
            }
        }
        return $errors;
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
        $this->validateLayout($this->post('_method') === 'PATCH' ? true : false );
        return $this->errors;
    }

}
