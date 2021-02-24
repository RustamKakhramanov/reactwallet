<?php


namespace App\Traits;


trait UploadWalletImages
{
    protected static  function createImages($request, $path){
        $images = [
            'logo',
            'icon@2x',
            'icon',
            'strip',
        ];

        if (!file_exists($path))
            mkdir($path, 0777, true);
        self::clearFiles($request, $path, ['headerLogo','stripImage'] + $images);
        if($request->file('headerLogo')){
            $request->file('headerLogo')->move($path , 'icon.png');
            self::copyImage($path, true);
        }

        if($request->file('stripImage'))
            $request->file('stripImage')->move($path , 'strip.png');

        if($request->file('thumbnail')){
            $request->file('thumbnail')->move($path , 'thumbnail.png');
            $images[] = 'thumbnail';
        }

        return $images;
    }

    protected static function  clearFiles($request, $path, $images){
        foreach ($images as $image) {
            if(file_exists($path.$image.'.png') && $request->file('headerLogo')){
                unlink($path.$image.'.png');
            }
        }
    }

    protected static function  copyImage($path, $isset){
        $images = [
            'icon@2x',
            'logo',
        ];

        if($isset){
            $img = file_get_contents($path.'icon.png');
        }else{
            $img = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/uploads/pattern/'.config('wallet.pattern').'/logo.png');
            $images[] = 'icon';
        }
        foreach ($images as $image){
            file_put_contents($path.$image.'.png', $img);
        }
    }

}
