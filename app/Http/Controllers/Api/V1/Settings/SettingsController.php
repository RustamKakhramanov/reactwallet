<?php

namespace App\Http\Controllers\Api\V1\Settings;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

use function GuzzleHttp\json_decode;

class SettingsController extends Controller
{

    public function getOptions(Request $request, $type)
    {
        $user = auth()->guard('api')->user();

        $settings = $user->settings()->where('type', $type)->first();

        if(!$settings) {
            return;
        }

        return response()->json(json_decode($settings->value, true));
    }

    public function save(Request $request, $type) {

        $user = auth()->guard('api')->user();
        $post = $request->post();
        foreach ($post as $key => $item){
            if($key == 'discount' || $key == 'balance'){
                $post[$key] = _parseInt($item) ? : 0;
            }
        }
        $setting = $user->settings()->where('type', $type)->first();
        if(!$setting) {
            $user->settings()->create([
                'type' => $type,
                'value' => json_encode($post)
            ]);
        }else {
            $user->settings()->find($setting->id)->update(['value' => json_encode($post)]);
        }
    }

}
