<?php

namespace App\Enums;

use MyCLabs\Enum\Enum;

class CardTypeEnum extends Enum
{
    private const STORE_CARD = 'storeCard';
    private const EVENT_TICKET = 'eventTicket';
    private const GENERIC = 'generic';
    private const COUPON = 'coupon';
    private const BOARDING_PASS = 'boardingPass';

}
