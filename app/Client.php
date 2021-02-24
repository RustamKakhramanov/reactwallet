<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = ['name', 'phone','balance', 'discount', 'layout_id', 'deleted', 'updated_at'];


    public function layout()
    {
        return $this->belongsTo('App\Models\Wallet\Layout');
    }

    public function card()
    {
        return $this->hasOne('App\Models\Wallet\Card');
    }


}
