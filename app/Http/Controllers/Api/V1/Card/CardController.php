<?php
namespace App\Http\Controllers\Api\V1\Card;

use App\Http\Controllers\Controller;
use App\Http\Requests\WalletCardRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Wallet\Layout;
use App\Models\Wallet\Card;
use Illuminate\Support\Facades\Auth;

class CardController extends Controller
{
    public function staticCreate(Request $request){
       $file =  Card::staticCreate($request['name']);
       if($file){
           $fileName = 'pass.pkpass';
           return response($file, 200, [
               'Content-Description' => 'File Transfer',
               'Content-Type' => 'application/vnd.apple.pkpass',
               'Content-Transfer-Encoding' => 'binary',
               'Content-Disposition' => 'attachment; filename="' . $fileName . '"',
               'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
               'Pragma: public',
               'Last-Modified' => gmdate('D, d M Y H:i:s T'),
           ]);
       }
        return ;
    }

    public function create(Request $request){
        $file = Card::createCard($request);
        return $file->id;
    }

    public function createLayout(WalletCardRequest $request){
        #TODO sometimes in custom validate
        $errors = $request->validate();
        if(!$errors){
            $post = $request->post();
            if($post['locations']){
                $post['locations'] = json_decode($post['locations'], true);
            }
            $layout = Layout::create([
                'user_id' =>  Auth::user()->id,
                'title' => $post['card']['title'],
                'foregroundColor' => $post['card']['foregroundColor'],
                'backgroundColor' => $post['card']['backgroundColor'],
                'type' => $post['card']['type'],
                'body' => json_encode($post)
            ]);
            if($layout){
                $path = 'uploads/user-layouts/'.Auth::id().'/'.$layout->id.'/';
                $layout->path = $path;
                $layout->save();
                $layout::createImages($request, $path);
            }
            return  $layout->id ? : false;
        }
        else
            return response($errors, 400 );
    }

    public function createTestCard($id){
        $layout =  Layout::find($id);
        $model = new Card();
        $model->imagesPath = 'uploads/user-layouts/'.$layout->creator->id.'/'.$layout->id.'/';
        $body = json_decode($layout->body);
        $body->card->organization_name = $layout->creator->organization_name ? : 'TestOrganization';
        $cardValues = $model->fieldsFill($body, true);
        $card = $model->createCard($cardValues,  $layout->type);
        if($card){
            $fileName = 'pass.pkpass';
            return response($card, 200, [
                'Content-Description' => 'File Transfer',
                'Content-Type' => 'application/vnd.apple.pkpass',
                'Content-Transfer-Encoding' => 'binary',
                'Content-Disposition' => 'attachment; filename="' . $fileName . '"',
                'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
                'Pragma: public',
                'Last-Modified' => gmdate('D, d M Y H:i:s T'),
            ]);
        }
    }

    public function download($id){
        $card =  Card::find($id);
        if($card && !$card->device){
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
    }

    public function layoutsList() : JsonResponse
    {
        $layouts = Layout::select('id', 'type','title','path', 'foregroundColor' , 'backgroundColor', 'created_at', 'updated_at')->where('user_id', Auth::id())->orderBy( 'id','DESC')->get();
        return response()->json($layouts);
    }

    public function deleteLayout($id) : JsonResponse
    {
        $layout =  Layout::find($id);
        $layout->cards()->detach();
        $layout->clients()->detach();
        $layout->delete();
        return response()->json($this->layoutsList());
    }

    public function updateLayout($id, WalletCardRequest $request)
    {
        $errors = $request->validate();
        if(!$errors){
            $post = $request->post();
            if($post['locations']){
                $post['locations'] = json_decode($post['locations'], true);
            }
            unset($post['_method']);
            $layout  = Layout::find($id);
            $layout->title = $post['card']['title'];
            $layout->type = $post['card']['type'];
            $layout->body = json_encode($post);
            if($layout->save())
                $layout::createImages($request, $layout->path);
            return  $layout->id ? : false;
        }
        else
            return response($errors, 400 );

    }

    public function showLayout($id) : JsonResponse
    {
        $layout = Layout::select('type','path','body', 'foregroundColor' , 'backgroundColor')->where('id', $id)->first();
        $layout->body = json_decode($layout->body);
        $layout->body->card->backgroundColor =  _parse_colors($layout->body->card->backgroundColor);
        $layout->body->card->foregroundColor =  _parse_colors($layout->body->card->foregroundColor);
        return response()->json($layout);
    }

}
