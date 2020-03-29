<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="format-detection" content="telephone=no">
        <title>Национальные проекты</title>
        <meta name="description"
              content="Национальные проекты">

        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        @yield('assets')
        @include('layouts.yandex')
    </head>
    <body>
    @yield('body')
    </body>
</html>
