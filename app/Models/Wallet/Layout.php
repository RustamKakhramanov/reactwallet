<?php


namespace App\Models\Wallet;

use App\Traits\UploadWalletImages;
use App\Traits\WalletFields;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Layout extends Model
{
    use UploadWalletImages,
        WalletFields;

    protected $table = 'layouts',
                $fillable = [
                    'id',
                    'user_id',
                    'title',
                    'type',
                    'body',
                    'path',
                    'foregroundColor',
                    'backgroundColor',
                ];


    public function creator(){
        return $this->belongsTo('App\User', 'user_id');
    }

    public static function  getFields($request){
        $path = 'uploads/test/';
        return $path;
    }
    public function clients()
    {
        return $this->hasMany('\App\Client');
    }
    public function cards()
    {
        return $this->hasMany('\App\Models\Wallet\Card');
    }
}
