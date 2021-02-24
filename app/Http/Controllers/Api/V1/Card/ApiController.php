<?php
namespace App\Http\Controllers\Api\V1\Card;



use App\Http\Controllers\Controller;
use App\Models\Wallet\Card;
use App\Models\Wallet\Device;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;

class ApiController extends Controller
{
    public function register(Request $request, $deviceLibraryIdentifier, $passTypeIdentifier, $serialNumber){
        if(strstr($request->headers->get('Authorization'), 'ApplePass')) {
            $model = Device::where('device_library_identifier',  $deviceLibraryIdentifier);
            $data = json_decode(file_get_contents("php://input"));
            $pushtoken = $data->pushToken;

            if($model->count() > 0) {
                $device =  $model->first();
                $device->push_token  = $pushtoken;
                $device->device_library_identifier  = $deviceLibraryIdentifier;
                $device->save();

                return new Response('', 200);
            }
            else {
                $card  = Card::where('serial_number',  $serialNumber)->first();
                Device::create([
                    'card_id' => $card->id,
                    'device_library_identifier' => $deviceLibraryIdentifier,
                    'push_token' => $pushtoken,
                    'serial_number' => $serialNumber,

                ]);
                return new Response('', 201);
            }
        } else {

            return new Response('', 401);
        }
    }

    public function updatedDate($deviceLibraryIdentifier, $passTypeIdentifier){
        $devices = Device::where('device_library_identifier',$deviceLibraryIdentifier)->get();
        $returnJSON = [];
        $returnJSON['lastUpdated'] =  (string)time();

        foreach ( $devices as $device) {
            $returnJSON['serialNumbers'][] = $device->card->serial_number;
        }

        return json_encode($returnJSON);
    }

    public function update(Request $request,$passTypeIdentifier, $serialNumber){
        #$passesUpdatedSince = $request->headers->get('if-modified-since');
        $json = null;
        $card  = Card::where('serial_number',  $serialNumber)->where('pass_type_identifier', $passTypeIdentifier)->first();
        if(isset($card->updated) && $card->updated){
            $data = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/uploads/pass.pkpass');

            $nameFile = 'passbook_'.time().'.pkpass';
            file_put_contents($nameFile, $data);
/*            $stream = function () use ($nameFile) {
                readfile($nameFile);
            };*/
            return response(readfile($nameFile), 200)
                ->withHeaders([
                    'Content-Type' => 'application/vnd.apple.pkpass',
                    'Content-length' => filesize($nameFile),
                    'Content-Disposition' => 'attachment; filename="passbook.pkpass"',
                    'Last-Modified' => gmdate('D, d M Y H:i:s T'),
                    'lastUpdated' => gmdate('D, d M Y H:i:s T'),
                ]);

        }else{
            return new Response('', 304);
        }
    }

    public function delete(){
        return new Response('', 200);
    }

    public function log(Request $request){
        $post = file_get_contents("php://input");
        DB::insert('insert into log (type, text) values (?, ?)', [$post, 'wallet']);
        #file_put_contents('log'.time().'.txt', $post);
        return new Response('', 200);
    }
}
