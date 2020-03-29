@extends('layouts.layout')

@section('content')
    <h1>Добавление новости</h1>
    <hr>
    <form action="{{route('newses.store')}}" method="post" enctype="multipart/form-data">
        {{ csrf_field() }}
        <div class="form-group">
            <label for="name">Заголовок</label>
            <input type="text" class="form-control" id="name" name="title" value="{{request('title', '')}}">
        </div>
        <div class="form-group">
            <label for="description">Описание</label>
            <input type="text" class="form-control" id="description" name="description" value="{{request('description', '')}}">
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
