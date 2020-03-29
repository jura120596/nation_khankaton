@extends('layouts.layout')

@section('content')
    <h1>Добавление проекта</h1>
    <hr>
    <form action="{{route('projects.store')}}" method="POST" enctype="multipart/form-data">
        {{ csrf_field() }}
        <div class="form-group">
            <label for="sphere">Национальный проект</label>
            <select id="sphere" name="sphere_id">
                @foreach(\App\Models\Sphere::all() as $sphere)
                    <option value="{{$sphere->id}}">{{$sphere->title}}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group">
            <label for="title">Название</label>
            <input type="text" width="150px" height="100px" class="form-control" id="title"
                   name="title" value="{{request('title')}}">
        </div>
        <div class="form-group">
            <label for="photo">Картинка</label>
            <input type="file" width="150px" height="100px" class="form-control" id="photo"
                   name="photo">
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
        <div class="form-group"  style="max-width: 85%" >
            <label for="content">Содержание</label>
            <textarea class="form-control" id="content" name="content">{{request('content')}}</textarea>
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
