<?php

namespace App\Enums;

use MyCLabs\Enum\Enum;

class BarCodeFormats extends Enum
{
    private const
        CODE128 = 'PKBarcodeFormatCode128',
        QR = 'PKBarcodeFormatQR',
        PDF417 = 'PKBarcodeFormatPDF417',
        AZTEC = 'PKBarcodeFormatAztec';

}
