<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <!-- Metas -->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
        <meta name="description" content="{{ config('app.description') }}">
        <meta name="theme-color" content="#00AEDF">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <meta property="og:site_name" content="{{ config('app.name') }}">
        <meta property="og:title" content="{{ config('app.name') }}">
        <meta property="og:description" content="{{ config('app.description') }}">
        <meta property="og:url" content="{{ config('app.url') }}">
        <meta property="og:image" content="">

        @if (config('app.env') === 'production')
            <meta name="sw-filepath" content="/service-worker.js">
        @endif

        <meta name="TELESCOPE_ENABLED" content="{{ config('telescope.enabled') }}">

        <!-- Title -->
        <title>{{ config('app.name') }}</title>

        <!-- Font -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">

        <!-- Manifest -->
        <link rel="manifest" href="/manifest.json">

        <!-- Icons -->
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

        <!-- Styles -->
        <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <link href="{{ asset('css/card.css') }}" rel="stylesheet">
        <style>
            html, body {
                margin: 0;
                padding: 0;
                font-family: 'Roboto';
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            #initial-content {
                display: none;
                background-color: #0000008a;
            }
            .field-elem {
                width: 100%;
                pointer-events:none !important;
            }
        </style>
    </head>

    <body>
        <noscript>
            <div class="full-height flex-center">
                <h1 class="noscript-message">
                    You need JavaScript enabled to run this app.
                </h1>
            </div>
        </noscript>

        <div id="initial-content" class="full-height flex-center">
            <!--
                Temporary content shown on page load,
                this is a convenient way to make the visitors of the site
                feel that they have reached the site.
            -->
        </div>

        <div id="root">
            <!--
                This is the root node that acts as the wrapper where
                the application will render the elements
            -->
        </div>

        <!-- Scripts -->
        <script>
            document.getElementById('initial-content').style.display = 'block';
        </script>

{{--        <script src="https://api-maps.yandex.ru/2.1/?apikey=20aadff4-aa14-44a4-b2d8-70edd5f9d465&lang=ru_RU"--}}
{{--                type="text/javascript">--}}
{{--        </script>--}}
{{--        <script>--}}
{{--            let myMap = new ymaps.Map('root', {--}}
{{--                center: [55.75, 37.57],--}}
{{--                zoom: 9,--}}
{{--                controls: ['SearchControl']--}}
{{--            });--}}
{{--            // let searchControl = new ymaps.control.SearchControl({--}}
{{--            //     options: {--}}
{{--            //         // Будет производиться поиск только по топонимам.--}}
{{--            //         provider: 'yandex#map'--}}
{{--            //     }--}}
{{--            // });--}}
{{--            //--}}
{{--            // let result = searchControl.getResult(0);--}}
{{--            // result.then(function (res) {--}}
{{--            //     console.log("Результат " + res );--}}
{{--            // }, function (err) {--}}
{{--            //     console.log("Ошибка");--}}
{{--            // });--}}
{{--        </script>--}}
        <script src="{{ _asset('js/vendor.js') }}" defer></script>
        <script src="{{ _asset('js/backoffice.js') }}" defer></script>
    </body>
</html>
