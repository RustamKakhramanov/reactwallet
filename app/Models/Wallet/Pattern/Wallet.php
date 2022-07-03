<?php


namespace App\Models\Wallet\Pattern;


class Wallet
{
    public $passTypeIdentifier,
            $formatVersion = 1,
            $organizationName,
            $teamIdentifier,
            $serialNumber,
            $backgroundColor,
            $foregroundColor,
            $logoText,
            $description,
            $authenticationToken,
            $webServiceURL,
            $locations,
            $barcode;

    public function  __construct($token, $number){
        $this->passTypeIdentifier =  config('wallet.passTypeIdentifier');
        $this->teamIdentifier = config('wallet.team_id');
        $this->webServiceURL = url(config('wallet.api_url'));
        $this->serialNumber =  $number;
        $this->authenticationToken =  $token;
    }

    public function  setAttributes($attributes, $type){
        $this->logoText = $attributes['masterFields']->title;
        $this->description = $attributes['masterFields']->title.' '.$type;
        $this->backgroundColor = $attributes['masterFields']->backgroundColor;
        $this->foregroundColor = $attributes['masterFields']->foregroundColor;
        $this->organizationName = $attributes['masterFields']->organization_name;
        $this->$type = $attributes['filledFields'];
        $this->barcode = $attributes['barcode'];
        if(isset($attributes['locations'])){
            $this->locations = $attributes['locations'];
        }
        if($attributes['backFields']){
            $this->$type->backFields = $attributes['backFields'];
        }
    }


/*    public static function setBarCode($format, $number){
        $barcode['format'] = $format;
        $barcode['message'] = $number;
        $barcode['messageEncoding'] = 'iso-8859-1';
        $barcode['altText'] = $number;

    }*/
}
