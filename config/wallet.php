<?php
    return [
        'cert_path' => base_path('certificates/certificate.p12'),
        'cert_pass' => 'QazWsx12',
        'dev_cert' => '',
        'default_balance' => '1000',
        'currency' => 'KZT',
        'team_id' => 'YW3A55PBT7',
        'discount' => '5',
        'passTypeIdentifier' => 'pass.kz.cloudsystem.disscountCard',
        'api_url' => url('/api'),
        'background' => 'rgb(55, 117, 50)',
        'text_color' => 'rgb(255, 255, 255)',
        'pattern' => 'nature',
        'push' => [
            'push_cert_uri_pem' => '/uploads/Certificates/mainsp.pem',
            'push_cert_passphrase' => 'QazWsx12',
        ],
    //        'db' =>  function () {
    //                    $size = file_get_contents('path/to/file.json');
    //                    $size = json_decode($size);
    //                    return $size;
    //                },
    ];
