<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Wallet\Card;
use App\Models\Wallet\Layout;
use App\Services\CardService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\ClientRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use App\User;
use App\Client;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ClientsController extends Controller
{
    public function register(ClientRequest $request, $id = null){
        //уникальный номер клиента
        $errors = $request->validate();
        if(!$errors){
            $company = $id ? User::find($id) :  Auth::user();
            $post = $request->post();
            if($post['discount'])
                $post['discount'] = _parseInt($post['discount']);
            if($post['balance'])
                $post['balance'] = _parseInt($post['balance']);
        }
        else {
            return response($errors, 400 );
        }
        if(!isset($post['layout_id'])) {
            //TODO Создать конфиг для случая когда пользователь не вводит шаблон
            $layout =  $company->layouts[0];
        }else {
            $layout = Layout::find($post['layout_id']);
        }


        $client = $company->clients()->create($post);
        //CardService::createClientWithCardByCompany($client)->save();

        $model = new Card();
        $model->imagesPath = 'uploads/user-layouts/'.$layout->creator->id.'/'.$layout->id.'/';
        $model->owner = $client;
        $body = json_decode($layout->body);
        $body->card->organization_name = $layout->creator->organization_name;
        $cardValues = $model->fieldsFill($body);

        return $model->createCard($cardValues,  $layout->type, true) ? $client->id : response('', 500);
    }


    public function list(Request $request){
        $user = Auth::user();
        return response()->json($user->clients()->where('deleted', false)->orderBy('id', 'desc')->get()->toArray());
    }

    public function show(Request $request, $id){
        $user = Auth::user();
        if(!$user->clients()->find($id)->where('deleted', false)->first()) {
            return false;
        }

        $client =  Client::where('id', $id)->with([
            'card.device',
            'layout' => function ($query) {
                    $query->select('id','title', 'type', 'path', 'backgroundColor', 'foregroundColor', 'created_at');
                },
            ])->first();
        unset($client->card->data);
        return $client;
    }

    public function changeField(Request $request, $id, $type, $value){
        $user = Auth::user();
        $client = $user->clients()->find($id);
        $resp = '';
        switch ($type) {
            case 'plus_balance' :
                $client->balance += (int) $value;
                $resp = $client->balance;
                $client->save();
                break;
            case 'minus_balance' :
                $balance = $client->balance -= $value;
                if($balance < 0){
                    return 'false';
                }
                $client->save();
                $resp = $client->balance;
                break;
            case 'transactions' :
                $client->card->update(['transactions' => !$client->card->transactions]);
                break;
        }
//        print_r($client->card);
//        echo $client->card->transactions;

        return response($resp, 200);
    }

    public function selfRegister(Request $request, $id){
        $layout = Layout::find($id);
        $creator = $layout->creator;
        $post = $request->post();
        $error = '';
        if($post){
            $request->validate(['name' => 'required', 'phone' => 'required|min:17|max:17']);
            $phone = str_replace('_', '_', $post['phone']);

            if(!$creator->clients()->where('phone', $phone)->first() && $post['name'] && iconv_strlen($phone)) {
                try {
                    DB::beginTransaction();

                    $settingsObject = $creator->settings()->where('type', 'loyalty')->first();
                    $saveParam = [
                        'name' => $post['name'],
                        'phone' => $phone,
                        'layout_id' => $id,
                    ];

                    if($settingsObject) {
                        $setting = json_decode($settingsObject->value);
                        $saveParam['discount'] = $setting->discount;
                        $saveParam['balance'] = $setting->balance;
                    }

                    $client = $creator->clients()->create($saveParam);

                    $card = new Card();
                    $card->imagesPath = 'uploads/user-layouts/'.$layout->creator->id.'/'.$layout->id.'/';
                    $card->owner = $client;
                    $body = json_decode($layout->body);
                    $body->card->organization_name = $layout->creator->organization_name;
                    $cardValues = $card->fieldsFill($body);
                    $card = $card->createCard($cardValues,  $layout->type, true);
                    $card->layout_id = $layout->id;
                    $card->save();

                    if($card){
                        $fileName = 'pass.pkpass';
                        return response($card->data, 200, [
                            'Content-Description' => 'File Transfer',
                            'Content-Type' => 'application/vnd.apple.pkpass',
                            'Content-Transfer-Encoding' => 'binary',
                            'Content-Disposition' => 'attachment; filename="' . $fileName . '"',
                            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
                            'Pragma: public',
                            'Last-Modified' => gmdate('D, d M Y H:i:s T'),
                        ]);
                    }

                    DB::commit();
                }catch (\Exception $exception) {
                    DB::rollBack();
                    throw new HttpException(400, $exception->getMessage());
                }

            }else {
                $error =  trans('validation.has_register') ;
            }
        }

        return view('client.self-signup', ['name' => $creator->organization_name, 'errorN' => $error]);
    }

    public function update(Request $request, $id){
        $client = Client::find($id);
        if($client){
            $post = $request->post();
            //TODO форейчем проверять сооответствуют ли новые поля старым, обновлять, отправлять пуш на апи
        }
    }

    public function SendPush(Request $request, $id = false){
        return $id ? $id: 2;
    }

    public function delete(Request $request, $id) : JsonResponse
    {
        $user = Auth::user();
        $user->clients()->detach($id);
        return response()->json($this->list($request));
    }
}
