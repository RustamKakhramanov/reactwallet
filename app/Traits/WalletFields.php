<?php


namespace App\Traits;


use Illuminate\Support\Str;
use PKPass\PKPass;

trait WalletFields
{
    public static $barcodeFormats = [
                    'PKBarcodeFormatCode128',
                    'PKBarcodeFormatQR',
                    'PKBarcodeFormatPDF417',
                    'PKBarcodeFormatAztec',
                ];

    public static function createLocations(){
        $locations[0]['longitude'] = '-122.3748889';
        $locations[0]['latitude'] = '37.6189722';
        return  json_decode(json_encode($locations, false));
    }

    public static function createSerialNumber(){
        return rand(100000, 999999) . '-' . rand(100, 999) . '-' . rand(100, 999);
    }

    public static function createBackFields($number){
        return json_decode('[
                    {
                        "key" : "website",
                        "label" : "Наш сайт",
                        "value" : "http://www.example.com/track-bags/XYZ123"
                    },
                    {
                        "key": "id",
                        "label": "Номер вашей карты",
                        "value": "' . $number . '"
                    }]');
    }

    public static function getBarcodeFormat($format){
        return self::$barcodeFormats[$format];
    }

    public static function unsetElem($variable, $config){
        foreach ($config as $item){
            if(is_object($variable))
                unset($variable->$item);
            else
                unset($variable[$item]);
        }
        return $variable;
    }

    public static function clearLocationsFields($body){
        foreach ($body as $item){
            unset($item->place);
        }
        return $body;
    }

    public  static function clearFields($variable, $object = false){
        foreach ($variable as $key => $item){
            if(empty($item)){
                if($object)
                    unset($variable->$key);
                else
                    unset($variable[$key]);
            }
        }
        return $variable;
    }

    public  static function createBarCode($format, $number){
        $barcode['format'] = $format;
        $barcode['message'] = $number;
        $barcode['messageEncoding'] = 'iso-8859-1';
        $barcode['altText'] = $number;
        return json_decode(json_encode($barcode));
    }

    public function staticCreate($name){
        $path = config('wallet.cert_path');
        $pass = config('wallet.cert_pass');
        $number = self::createSerialNumber();
        $pass = new PKPass($path, $pass);
        $token = Str::random(32);
        $pass->setData('{
            "passTypeIdentifier": "'.config('wallet.passTypeIdentifier').'",
            "formatVersion": 1,
            "organizationName": "A Cosmetics | Nature Republic",
            "teamIdentifier": "YW3A55PBT7",
            "serialNumber": "'.$number.'",
            "backgroundColor": "'.config('wallet.background').'",
            "foregroundColor":"'.config('wallet.text_color').'",
            "logoText": "Nature Republic",
            "description": "A Cosmetics | Nature Republic",
            "authenticationToken": "'.$token.'",
            "webServiceURL": "'.config('wallet.api_url').'",
            "locations" : [
                {
                  "longitude" : -122.3748889,
                  "latitude" : 37.6189722
                }
            ],
            "storeCard": {
                "secondaryFields": [
                    {
                        "key": "name",
                        "label": "Имя",
                        "value": "' . $name . '"
                    }
                ],
                "auxiliaryFields":[
                    {
                        "key": "balance", "label": "Баланс", "value": 101, "currencyCode": "KZT", "changeMessage": "'.$name.', ваш баланс изменился %@."
                    }
                ],

                "headerFields":[ {
                        "key": "info", "label": "Скидка", "value": "'.config('wallet.discount').'%", "changeMessage": "'.$name.', ваша скидка %@."
                    }
                ],
                "backFields": [
                    {
                        "key" : "website",
                        "label" : "Наш сайт",
                        "value" : "http://www.example.com/track-bags/XYZ123"
                    },
                    {
                        "key": "id",
                        "label": "Номер вашей карты",
                        "value": "' . $number . '"
                    }

                ]
            },
            "barcode": {
                "format": "PKBarcodeFormatCode128",
                "message": "' . $number . '",
                "messageEncoding": "iso-8859-1",
                "altText": "' . $number . '"
            }
        }');

        $pass->addFile(public_path('uploads/pattern/'.config('wallet.pattern').'/icon.png'));
        $pass->addFile(public_path('uploads/pattern/'.config('wallet.pattern').'/logo.png'));
        $pass->addFile(public_path('uploads/pattern/'.config('wallet.pattern').'/strip.png'));
        $pass->addFile(public_path('uploads/pattern/'.config('wallet.pattern').'/icon@2x.png'));
        $file = $pass->create();
        if($file) { // Create and output the
            self::create([
                'username' => $name,
                'pass_type_identifier' => config('wallet.passTypeIdentifier'),
                'serial_number' => $number,
                'discount' => config('wallet.discount'),
                'balance' => config('wallet.default_balance'),
                'authentication_token' => $token,
                'data' => $file,
            ]);
            return $file;
        }else{
            return false;
        }
    }

}
