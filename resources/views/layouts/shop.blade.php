<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="format-detection" content="telephone=no">
        <title>Онлайн-магазин ЧЕМОДАН.CLUB</title>
        <meta name="description"
              content="Недорогие, дешевые чемоданы на колесах в интернет магазине, Быстрая доставка в Москве! Доставка в течение 2-3 часов!">
        <meta name="keywords"
              content="чемодан на колесах, чемоданы на колесах недорого, недорогие чемоданы на колесах, чемоданы на колесах в Москве, чемоданы на колесах магазин, чемодан на колесах интернет, чемодан на колесах интернет магазин, чемодан колесах магазин недорого, чемодан на колесах интернет магазин недорого , недорогие чемоданы на колесах интернет магазин">
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        @yield('assets')
        @include('layouts.yandex')
    </head>
    <body>
    @yield('body')
    </body>
</html>
