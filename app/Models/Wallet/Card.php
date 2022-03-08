<?php

namespace App\Models\Wallet;
use App\Client;
use App\Models\Wallet\Pattern\Wallet;
use App\Models\Wallet\Pattern\TypeCard;
use App\User;
use Illuminate\Database\Eloquent\Model;
use PKPass\PKPass;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use \App\Traits\UploadWalletImages;
use \App\Traits\WalletFields;

/**
 * @property User | boolean $owner
 */
class Card extends Model
{
    use UploadWalletImages,
        WalletFields;
    protected $table = 'cards',
        $fillable = ['id', 'layout_id', 'client_id', 'username', 'transactions', 'pass_type_identifier', 'serial_number', 'authentication_token', 'jsonData', 'data', 'balance', 'discount', 'updated'];

    public $imagesPath,
        $owner = false;

    public function fieldsFill($body, $test = false){
        $type = $body->card->type;
        $masterFields = $body->card;
        $number = self::createSerialNumber();
        $token  = Str::random(32);
        $object = new Wallet($token, $number);
        $cardFields = [
            'masterFields' =>  $masterFields,
            'backFields' => isset($body->backFields) ? $this->backFieldsFill((array) $body->backFields) : false,
            'barcode' =>   $this->barcodeFill($body->barcode, $number),
        ];

        if(isset($body->locations)){
            $cardFields['locations']  = self::clearLocationsFields($body->locations);
        }

        $fields = self::unsetElem($body, ['backFields', 'barcode', 'card', 'locations'], true);

        $cardFields['filledFields'] =  $this->cardFieldsFill($fields);

        $object->setAttributes($cardFields, $type);
        if(!$object->locations)
            unset($object->locations);
        return $object;
    }

    public function backFieldsFill($fields){
        $config = [];
        $arrayTo = [];
        foreach ($fields as $key => $field){
                if($key === 'owner'){
                    $array = [
                        'key' => $key,
                        'label' => trans('content.wallet.filled.'.$key.'.label'),
                        'value' => $this->owner ? $this->owner->name : trans('content.wallet.filled.'.$key.'.value'),
                    ];
                    $arrayTo[] = json_decode(json_encode($array));
                    $config[] = $key;
                }
                else {
                    $arrayTo[] = $field;
                }
//                if($key === 'transactions'){
//                    $this->transactions = true;
//                    $config[] = $key;
//                }
        }

        return $arrayTo;
    }

    public function cardFieldsFill($fields, $test = false){
        foreach ($fields as $fieldsKey => $field){
            foreach ($field as $fieldKey => $item){
                if(!$item->key){
                    unset($fields->$fieldsKey[$fieldKey]);
                }
                if($item->key == 'name' || $item->key == 'discount' || $item->key == 'balance'){
                    $item->changeMessage = trans('content.wallet.filled.'.$item->key.'.push');
                    if(!$this->owner){
                        $item->value = trans('content.wallet.filled.'.$item->key.'.value');
                    }else{
                        $key = $item->key;
                        $item->value = $this->owner->$key;
                        $item->value .= $key == 'discount' ? '%': '';

                    }
                }
                if($item->key == 'balance'){
                    $item->currencyCode = 'KZT';
                }
            }
        }

        return self::clearFields($fields, true);
    }

    public function barcodeFill($barcode, $number){
        $barcode->message = $number;
        $barcode->altText = $barcode->altText == '{Card ID}' ? $number : $barcode->altText  ;
        return  $barcode;
    }

    public  function createCard($values,  $type, $save = false){
        $number = $values->serialNumber;
        $token = $values->authenticationToken;
        $images = [
            'logo',
            'icon@2x',
            'icon',
            'strip',
        ];
        if ($type === 'generic' )
            $images[] = 'thumbnail';

        $path = config('wallet.cert_path');

        $pass = config('wallet.cert_pass');

        $pass = new PKPass($path, $pass);
        $pass->setData(json_encode($values));

        foreach ($images as $image){
            $pass->addFile(public_path($this->imagesPath.$image.'.png'));
        }

        $file = $pass->create();

        if($file && $save) { // Create and output the
             return  self::create([
                'client_id' =>  $this->owner ? $this->owner->id : 1,
                'pass_type_identifier' => config('wallet.passTypeIdentifier'),
                'serial_number' => $number,
                'transactions' => false,
                'authentication_token' => $token,
                'data' => $file,
                'jsonData' => json_encode($values),
            ]);
        }else if($file && !$save){
            return  $file;
        }else{
            return false;
        }
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function device()
    {
        return $this->hasOne(Device::class);
    }

    public function layout()
    {
        return $this->belongsTo(Layout::class);
    }

}
