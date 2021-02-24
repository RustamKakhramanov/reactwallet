<?php


namespace App\Models\Wallet\Pattern;


class TypeCard
{
    public
        $headerFields,
        $primaryFields,
        $secondaryFields,
        $auxiliaryFields,
        $backFields;

    public function __construct($fields)
    {
        $this->setFields($fields);
    }

    private  function  setFields($fields){
        $this->headerFields = [$fields['headerFields'] ? : ""];
        $this->primaryFields = [isset($fields['primaryFields']) ? : ""];
        $this->secondaryFields = [$fields['secondaryFields'] ? : ""];
        $this->auxiliaryFields = [$fields['auxiliaryFields'] ? : ""];
       # $this->backFields = [$fields['backFields'] ?: ""];
        $this->backFields = $fields['backFields'] ?: "";
    }
}
