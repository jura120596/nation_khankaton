@extends('layouts.layout')

@section('content')
    <h1>Редактирование сферы</h1>
    <hr>
    <form action="{{route('spheres.update', [$sphere->id])}}" method="POST" enctype="multipart/form-data">
        {{ csrf_field() }}
        {{ method_field('PUT') }}
        <div>
            <img style="max-width: 150px" src="{{Storage::url($sphere->photo)}}">
        </div>
        <div>
            <img  style="max-width: 150px" src="{{Storage::url($sphere->logo)}}">
        </div>
        <div class="form-group">
            <label for="size">Заголовок</label>
            <input type="text" class="form-control" id="size" name="title" value="{{$sphere->title}}">
        </div>
        <div class="form-group">
            <label for="name">Описание</label>
            <input type="text" class="form-control" id="name" name="description" value="{{$sphere->description}}">
        </div>
        <div class="form-group">
            <label for="picture">Картинка</label>
            <input type="file" width="150px" height="100px" class="form-control" id="picture"
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
            <label for="start">Стартовая дата</label>
            <input type="date" width="150px" height="100px" class="form-control" id="start"
                   {{$sphere->start ? ' value=' . $sphere->start->format('Y-m-d')  : ''}} name="start">
        </div>
        <div class="form-group">
            <label for="end">Дата завершения</label>
            <input type="date" width="150px" height="100px" class="form-control" id="end"
                   {{$sphere->end ? ' value=' . $sphere->end->format('Y-m-d')  : ''}}  name="end">
        </div>
        <div class="form-group">
            <label for="enabled">Отображается на сайте</label>
            <input type="checkbox" class="form-control" id="enabled" name="enabled" {{$sphere->enabled ? 'checked' : ''}}>
        </div>
        <div class="form-group"  style="max-width: 85%" >
            <label for="target">Цели</label>
            <textarea class="form-control" id="end" name="target">{{$sphere->target}}</textarea>
        </div>
        <div class="form-group"  style="max-width: 85%" >
            <label for="target">Контакты</label>
            <textarea class="form-control" id="end" name="contacts">{{$sphere->contacts}}</textarea>
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
