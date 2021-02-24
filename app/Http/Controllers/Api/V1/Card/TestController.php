<?php
namespace App\Http\Controllers\Api\V1\Card;

use App\Http\Controllers\Controller;
use App\Models\Wallet\Card;
use App\Models\Wallet\Device;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TestController extends Controller
{
    public function register(Request $request,$deviceLibraryIdentifier, $passTypeIdentifier, $serialNumber){

        $model = Device::where('device_library_identifier',  $deviceLibraryIdentifier);
        $data = json_decode(file_get_contents("php://input"));
        $pushtoken = 'sdsdsdsd';

        if($model->count() > 0) {
            $card =  $model->first();
            $card->push_token  = $pushtoken;
            $card->device_library_identifier  = $deviceLibraryIdentifier;
            $card->save();

            return new Response('', 200);
        }
        else {
            $card  = Card::where('serial_number',  $serialNumber);
            Device::create([
                'pass_id' => $card->first()->id,
                'device_library_identifier' => $deviceLibraryIdentifier,
                'push_token' => $pushtoken,
                'serial_number' => $serialNumber,

            ]);
            return new Response('', 201);
        }
    }

    public function updatedDate(){
        $returnJSON = [];
        $returnJSON['lastUpdated'] = time();
        $returnJSON['serialNumbers'][] = '336118-967-258';
        return json_encode($returnJSON);
    }

    public function update(Request $request, $serialNumber, $passTypeIdentifier){
        #$passesUpdatedSince = $request->headers->get('if-modified-since');
        $json = null;
        $card  = Card::where('serial_number',  $serialNumber)->where('pass_type_identifier', $passTypeIdentifier)->first();
        if(isset($card->updated) && $card->updated){
            $data = $card->data;
            $nameFile = 'passbook_'.time().'.pkpass';
            file_put_contents($nameFile, $data);
            $stream = function () use ($nameFile) {
                readfile($nameFile);
            };

            return response($stream, 200)
                ->withHeaders([
                    'Content-Type' => 'application/vnd.apple.pkpass',
                    'Content-length' => filesize($nameFile),
                    'Content-Disposition' => 'attachment; filename="passbook.pkpass"',
                    'Last-Modified' => gmdate('D, d M Y H:i:s T')
                ]);

        }else{
            return new Response('', 304);
        }
    }

    public function delete(){
        return new Response('', 200);
    }
}
