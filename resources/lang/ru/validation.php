<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => ' :attribute должен быть принят',
    'active_url' => ' :attribute не является валидным URL',
    'after' => ' :attribute надо установить позднее :date.',
    'after_or_equal' => ' :attribute может быть равно или больше :date.',
    'alpha' => ' :attribute может содержать только буквы.',
    'alpha_dash' => ':attribute может содержать только буквы, цифры, тире и подчеркивания.',
    'alpha_num' => ':attribute может содержать только буквы и цифры.',
    'array' => ':attribute должен быть массивом.',
    'before' => ':attribute нужно ввести раньше :date.',
    'before_or_equal' => ' :attribute может быть равно или раньше :date.',
    'has_register' => 'номер уже зарегестрирован',
    'between' => [
        'numeric' => ':attribute должен быть между :min и :max.',
        'file' => ':attribute должен быть между :min и :max килобайт.',
        'string' => ':attribute должен быть между: min и: max символами.',
        'array' => ':attribute должен иметь значения между:min и :max элементами.',
    ],
    'wallet' => [
        'static' => 'Если поле статичное, вы должны заполнить все его параметры',
        'title' => 'Введите описание карты',
        'altText' => 'Введите текст под баркодом',
        'date' => 'Вы не ввели дату',
        'required' => 'Заполните поле',
        'images' => 'Залейте все изображения',
        'imagesFormat' => 'Формат файла не подходит',
        'uniqueKeys' => 'Все элементы и их ключи должны быть уникальны',
        'backSide' => 'Добавленные элементы на обратной стороне карты должны быть заполнены',
    ],
    'boolean' => 'The :attribute field must be true or false.',
    'confirmed' => 'The :attribute confirmation does not match.',
    'date' => 'The :attribute is not a valid date.',
    'date_format' => 'The :attribute does not match the format :format.',
    'different' => 'The :attribute and :other must be different.',
    'digits' => 'The :attribute must be :digits digits.',
    'digits_between' => 'The :attribute must be between :min and :max digits.',
    'dimensions' => 'The :attribute has invalid image dimensions.',
    'distinct' => 'The :attribute field has a duplicate value.',
    'email' => 'The :attribute must be a valid email address.',
    'exists' => 'The selected :attribute is invalid.',
    'file' => 'The :attribute must be a file.',
    'filled' => 'The :attribute field must have a value.',
    'all_required' => 'Поле ввода :attribute должно быть полнстью заполнено.',
    'number_all_required' => 'Номер телефона не заполнен.',
    'name_required' => 'Заполните имя клиента',
    'minus_balance' => 'Операция невозможна: баланс уйдет в минус',
    'gt' => [
        'numeric' => 'The :attribute must be greater than :value.',
        'file' => 'The :attribute must be greater than :value kilobytes.',
        'string' => 'The :attribute must be greater than :value characters.',
        'array' => 'The :attribute must have more than :value items.',
    ],
    'gte' => [
        'numeric' => 'The :attribute must be greater than or equal :value.',
        'file' => 'The :attribute must be greater than or equal :value kilobytes.',
        'string' => 'The :attribute must be greater than or equal :value characters.',
        'array' => 'The :attribute must have :value items or more.',
    ],
    'image' => 'The :attribute must be an image.',
    'in' => 'The selected :attribute is invalid.',
    'in_array' => 'The :attribute field does not exist in :other.',
    'integer' => 'The :attribute must be an integer.',
    'ip' => 'The :attribute must be a valid IP address.',
    'ipv4' => 'The :attribute must be a valid IPv4 address.',
    'ipv6' => 'The :attribute must be a valid IPv6 address.',
    'json' => 'The :attribute must be a valid JSON string.',
    'lt' => [
        'numeric' => 'The :attribute must be less than :value.',
        'file' => 'The :attribute must be less than :value kilobytes.',
        'string' => 'The :attribute must be less than :value characters.',
        'array' => 'The :attribute must have less than :value items.',
    ],
    'lte' => [
        'numeric' => 'The :attribute must be less than or equal :value.',
        'file' => 'The :attribute must be less than or equal :value kilobytes.',
        'string' => 'The :attribute must be less than or equal :value characters.',
        'array' => 'The :attribute must not have more than :value items.',
    ],
    'max' => [
        'numeric' => 'The :attribute may not be greater than :max.',
        'file' => 'The :attribute may not be greater than :max kilobytes.',
        'string' => 'The :attribute may not be greater than :max characters.',
        'array' => 'The :attribute may not have more than :max items.',
    ],
    'mimes' => 'The :attribute must be a file of type: :values.',
    'mimetypes' => 'The :attribute must be a file of type: :values.',
    'min' => [
        'numeric' => 'The :attribute must be at least :min.',
        'file' => 'The :attribute must be at least :min kilobytes.',
        'string' => 'The :attribute must be at least :min characters.',
        'array' => 'The :attribute must have at least :min items.',
    ],
    'not_in' => 'The selected :attribute is invalid.',
    'not_regex' => 'The :attribute format is invalid.',
    'numeric' => 'The :attribute must be a number.',
    'present' => 'The :attribute field must be present.',
    'pwned' => 'The :attribute is weak, please enter a strong password.',
    'regex' => 'The :attribute format is invalid.',
    'required' => ':attribute должно быть заполнено',
    'required_if' => 'The :attribute field is required when :other is :value.',
    'required_unless' => 'The :attribute field is required unless :other is in :values.',
    'required_with' => 'The :attribute field is required when :values is present.',
    'required_with_all' => 'The :attribute field is required when :values are present.',
    'required_without' => 'The :attribute field is required when :values is not present.',
    'required_without_all' => 'The :attribute field is required when none of :values are present.',
    'same' => 'The :attribute and :other must match.',
    'size' => [
        'numeric' => 'The :attribute must be :size.',
        'file' => 'The :attribute must be :size kilobytes.',
        'string' => 'The :attribute must be :size characters.',
        'array' => 'The :attribute must contain :size items.',
    ],

    'string' => 'The :attribute must be a string.',
    'timezone' => 'The :attribute must be a valid zone.',
    'unique' => 'The :attribute has already been taken.',
    'uploaded' => 'The :attribute failed to upload.',
    'url' => 'The :attribute format is invalid.',
    'uuid' => 'The :attribute must be a valid UUID.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

//    'boolean' => 'Поле атрибута: должно быть истинным или ложным.',
//    'Verified' => 'Подтверждение: атрибут не совпадает.',
//    'date' => 'Атрибут: не является допустимой датой.',
//    'date_format' => 'Атрибут: не соответствует формату: формат.',
//    'different' => 'Атрибут:: и: other должны быть разными.',
//    'digits' => 'Атрибут: должен быть: цифры цифры.',
//    'digits_between' => 'Атрибут: должен быть между: min и: max digits.',
//    'sizes' => 'Атрибут: имеет недопустимые размеры изображения.',
//    'different' => 'Поле: attribute имеет повторяющееся значение.',
//    'email' => 'Атрибут: должен быть действительным адресом электронной почты.',
//    'exist' => 'Выбранный: атрибут недействителен.',
//    'file' => 'Атрибут: должен быть файлом.',
//    'fill' => 'Поле: attribute должно иметь значение.',
//    'gt' => [
//        'numeric' => 'Атрибут: должен быть больше чем: значение.',
//        'file' => 'Атрибут: должен быть больше чем: значение в килобайтах.',
//        'string' => 'Атрибут: должен быть больше чем: значение символов.',
//        'array' => 'Атрибут: должен иметь больше чем: значение элементов.',
//    ],
//    'gte' => [
//        'numeric' => 'Атрибут: должен быть больше или равен: значению.',
//        'file' => 'Атрибут: должен быть больше или равен: значение в килобайтах.',
//        'string' => 'Атрибут: должен быть больше или равен символам: значение.',
//        'array' => 'Атрибут: должен иметь: элементы значения или более.',
//    ],
//    'image' => 'Атрибут: должен быть изображением.',
//    'in' => 'Выбранный: атрибут недействителен.',
//    'in_array' => 'Поле атрибута: не существует в: other.',
//    'integer' => 'Атрибут: должен быть целым числом.',
//    'ip' => 'Атрибут: должен быть действительным IP-адресом.',
//    'ipv4' => 'Атрибут: должен быть действительным адресом IPv4.',
//    'ipv6' => 'Атрибут: должен быть действительным адресом IPv6.',
//    'json' => 'Атрибут: должен быть допустимой строкой JSON.',
//    'lt' => [
//        'numeric' => 'Атрибут: должен быть меньше чем: значение.',
//        'file' => 'Атрибут: должен быть меньше, чем: значение в килобайтах.',
//        'string' => 'Атрибут: должен быть меньше чем: значение символов.',
//        'array' => 'Атрибут: должен содержать меньше: value элементов.',
//    ],
//    'lte' => [
//        'numeric' => 'Атрибут: должен быть меньше или равен: значению.',
//        'file' => 'Атрибут: должен быть меньше или равен: значение в килобайтах.',
//        'string' => 'Атрибут: должен быть меньше или равен символам: value.',
//        'array' => 'Атрибут: не должен содержать больше, чем: value items.',
//    ],
//    'max' => [
//        'numeric' => 'Атрибут: не может быть больше, чем: max.',
//        'file' => 'Атрибут: не может быть больше, чем: max килобайт.',
//        'string' => 'Атрибут: не может быть больше, чем: max символов.',
//        'array' => 'Атрибут: может содержать не более: max элементов.',
//    ],
//    'mimes' => 'Атрибут: должен быть файлом типа:: values.',
//    'mimetypes' => 'Атрибут: должен быть файлом типа:: values.',
//    'min' => [
//        'numeric' => 'Атрибут: должен быть не менее: min.',
//        'file' => 'Атрибут: должен быть не менее: минимум килобайт.',
//        'string' => 'Атрибут: должен содержать не менее: минимум символов.',
//        'array' => 'Атрибут: должен содержать как минимум: min items.',
//    ],
//    'not_in' => 'Атрибут selected: недействителен.',
//    'not_regex' => 'Неверный формат атрибута.',
//    'numeric' => 'Атрибут: должен быть числом.',
//    'present' => 'Поле: атрибут должно присутствовать.',
//    'pwned' => 'Атрибут: слабый, введите надежный пароль.',
//    'regex' => 'Неверный формат атрибута.',
//    'required' => 'Поле: атрибут обязательное.',
//    'required_if' => 'Поле: атрибут обязательное, когда: other is: value.',
//    'required_unless' => 'Поле: атрибут является обязательным, если: other не находится в: values.',
//    'required_with' => 'Поле: атрибут обязательное, если присутствует: values.',
    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],

];
