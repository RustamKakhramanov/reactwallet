<?php

namespace App\Models\Wallet;

use App\Traits\Push;
use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    use Push;

    protected
        $table = 'devices',
        $fillable = ['card_id', 'device_library_identifier', 'serial_number','push_token'];

    public function card(){
        return $this->belongsTo('App\Models\Wallet\Card');
    }
}
