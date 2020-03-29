@extends('layouts.layout')

@section('content')
    <h1>Добавление сферы</h1>
    <hr>
    <form action="{{url('spheres')}}" method="post" enctype="multipart/form-data">
        {{ csrf_field() }}
        <div class="form-group">
            <label for="title">Заголовок</label>
            <input type="text" class="form-control" id="title" name="title" value="{{request('title', '')}}">
        </div>
        <div class="form-group">
            <label for="description">Описание</label>
            <textarea class="form-control" id="description" name="description">{{request('description', '')}}</textarea>
        </div>
        <div class="form-group">
            <label for="photo">Картинка</label>
            <input type="file" width="150px" height="100px" class="form-control" id="photo"
                   name="photo">
        </div>
        <div class="form-group">
            <label for="picture2">Логотип</label>
            <input type="file" width="150px" height="100px" class="form-control" id="picture2"
                   name="logo">
        </div>
        <div class="form-group">
            <label for="passport">Паспорт проекта</label>
            <input type="file" width="150px" height="100px" class="form-control" id="passport"
                   name="file">
        </div>
        <div class="form-group">
            <label for="enabled">Отображается на сайте</label>
            <input type="checkbox" class="form-control" id="enabled" name="enabled" {{request('enabled', '') ? 'checked' : ''}}>
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
    <a href="{{route('spheres.index')}}"><button>К списку</button></a>
@endsection
