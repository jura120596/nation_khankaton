@extends('layouts.layout')

@section('content')
    <h1>Просмотр новости</h1>
    <hr>
    <div class="form-group">
        <label for="size">Заголовок: {{$news->title}}</label>
    </div>
    <div class="form-group">
        <label for="cost">Основная картинка:</label>
        <div>
            <img style="max-height:150px" src="{{Storage::url($news->photo)}}">
        </div>
    </div>
    <a href="{{route('newses.index')}}"><button>К списку</button></a>
@endsection
