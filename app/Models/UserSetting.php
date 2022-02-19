<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserSetting extends Model
{
    protected  $table = 'user_settings',
    $fillable = ['user_id', 'type', 'value'];

    public function user(){
        return $this->belongsTo('App\User');
    }
}

