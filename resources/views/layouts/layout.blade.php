<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>
    <style>
        body {
            vertical-align: top;
            text-align: center;

        }
        body tr td, body tr th {
            padding: 10px;
        }
    </style>
    <!-- Fonts -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
    <script src="http://inlibrary.ru/manage/assets/557abc0a/tinymce.js" referrerpolicy="origin"></script>
    <script>tinymce.init({
            selector:'textarea',
            height: 500,
        });</script>

</head>
<body>
<div class="flex-center position-ref full-height">
    <ul style="position: absolute; height: 100%; right: 0; border-left: 2px solid">
        <h5>Меню</h5>
        <br>
        <li><a href="{{route('nation.main')}}">Сайт</a> </li>
        <li><a href="{{route('spheres.index')}}">Сферы деятельности</a> </li>
        <li><a href="{{route('newses.index')}}">Новости</a> </li>
        <li><a href="{{route('pictures.index')}}">Изображения</a> </li>
    </ul>
    <div class="content w-75">
        @yield('content')
    </div>
</div>
</body>
</html>
