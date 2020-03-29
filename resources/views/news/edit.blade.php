@extends('layouts.layout')

@section('content')
    <h1>Редактирование новости</h1>
    <hr>
    <form action="{{route('newses.update', ['news_id' => $news->id])}}" method="post" enctype="multipart/form-data">
        {{ csrf_field() }}
        {{method_field('PUT')}}
        <div class="form-group">
            <label for="name">Заголовок</label>
            <input type="text" class="form-control" id="name" name="title" value="{{$news->title}}">
        </div>
        <div class="form-group" style="max-width: 75% !important;">
            <label for="description">Описание</label>
            <textarea class="form-control" id="description" name="description">{{$news->description}}</textarea>
        </div>
        <div class="form-group">
            <label for="photo">Основная картинка</label>
            <input type="file" width="150px" height="100px" class="form-control" id="photo"
                   name="photo">
        </div>
        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <button type="submit" class="btn btn-primary">Сохранить</button>
    </form>
    <a href="{{route('newses.index')}}"><button>К списку</button></a>
@endsection
