<?php


namespace App\Traits;

/**
 * Push trait
 *
 * @property string $push_token
 */
trait Push
{

    public function sendPush($token = false){
        $token = $token ? : $this->push_token;
        $config = config('wallet.push');
        $cert = $_SERVER['DOCUMENT_ROOT'].$config['push_cert_uri_pem'];
        $password = $config['push_cert_passphrase'];

        $ctx = stream_context_create();
        stream_context_set_option($ctx, 'ssl', 'passphrase', $password);
        stream_context_set_option($ctx, 'ssl', 'local_cert', $cert);
        $fp = stream_socket_client('ssl://gateway.push.apple.com:2195', $err, $errstr, 60, STREAM_CLIENT_CONNECT, $ctx);
        stream_set_blocking ($fp, 0);

        if (!$fp) {
            //ERROR
            echo "Failed to connect (stream_socket_client): $err $errstrn";
        } else {

            // Create the payload body
            $body = [
                'aps' => [
                    'title' => 'Game Request',
                    'subtitle' => 'Five Card Draw',
                    'body' => 'Bob wants to play poker',
                    'link_url' => config('wallet.api_url'),
                ],
                'deviceToken ' => $token,
                'id' => [
                  'id' =>  '123835-210-434'
                ]

            ];

            $payload = json_encode($body);
            //Enhanced Notification
            $msg = chr(0) . pack('n', 32) . pack('H*', $token) . pack('n', strlen($payload)) . $payload;

            //SEND PUSH
            $result = fwrite($fp, $msg);
            //We can check if an error has been returned while we are sending, but we also need to check once more after we are done sending in case there was a delay with error response.
            $this->checkAppleErrorResponse($fp);
            usleep(500000); //Pause for half a second. Note I tested this with up to a 5 minute pause, and the error message was still available to be retrieved
            $this->checkAppleErrorResponse($fp);

            if (!$result)
                echo 'Message not delivered' . PHP_EOL;
            else {
                echo 'Message successfully delivered' . PHP_EOL;
                var_dump($result);
            }

            // Close the connection to the server
            fclose($fp);
        }
    }

    function checkAppleErrorResponse($fp) {
        $apple_error_response = fread($fp, 6);

        if ($apple_error_response) {

            $error_response = unpack('Ccommand/Cstatus_code/Nidentifier', $apple_error_response);
            switch ($error_response['status_code']){
                case '0':
                    $error_response['status_code'] = '0-No errors encountered';
                    break;
                case '1':
                    $error_response['status_code'] = '1-Processing error';
                    break;
                case '2':
                    $error_response['status_code'] = '2-Missing device token';
                    break;
                case '3':
                    $error_response['status_code'] = '3-Missing topic';
                    break;
                case '4':
                    $error_response['status_code'] = '4-Missing payload';
                    break;
                case '5':
                    $error_response['status_code'] = '5-Invalid token size';
                    break;
                case '6':
                    $error_response['status_code'] = '6-Invalid topic size';
                    break;
                case '7':
                    $error_response['status_code'] = '7-Invalid payload size';
                    break;
                case '8':
                    $error_response['status_code'] = '8-Invalid token';
                    break;
                case '255':
                    $error_response['status_code'] = '255-None (unknown)';
                    break;
                default: $error_response['status_code'] = $error_response['status_code'] . '-Not listed';

            }

            echo '<br><b>+ + + + + + ERROR</b> Response Command:<b>' . $error_response['command'] . '</b>&nbsp;&nbsp;&nbsp;Identifier:<b>' . $error_response['identifier'] . '</b>&nbsp;&nbsp;&nbsp;Status:<b>' . $error_response['status_code'] . '</b><br>';
            echo 'Identifier is the rowID (index) in the database that caused the problem, and Apple will disconnect you from server. To continue sending Push Notifications, just start at the next rowID after this Identifier.<br>';

            return true;
        }
        return false;
    }
}
