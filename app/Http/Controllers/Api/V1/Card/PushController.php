<?php

namespace App\Http\Controllers\Api\V1\Card;

use App\Http\Controllers\Controller;
use App\Models\Wallet\Device;
use App\Models\Wallet\Card;

class PushController extends Controller
{
    public function send(){
        $pushModel = new Device();
        return $pushModel->sendPush('19e876b60a865970268e84f2ae42c1935b08dc3d662f4d423845bccf0249d421');
    }
}
