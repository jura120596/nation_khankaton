@extends('layouts.layout')

@section('content')
    <h1>Просмотр сферы</h1>
    <hr>
    <form action="{{url('spheres')}}" method="post">
        {{ csrf_field() }}
        <div>
            <img  style="max-width: 150px" src="{{Storage::url($sphere->photo)}}">
        </div>
        <div>
            <img  style="max-width: 150px" src="{{Storage::url($sphere->logo)}}">
        </div>
        <div class="form-group">
            <label for="size">Заголовок: </label> <div><p>{{$sphere->title}}</p></div>
        </div>
        <div class="form-group">
            <label for="name">Описание: </label>
            <div><p>{{$sphere->description}}</p></div>
        </div>
        <div class="form-group">
            <label for="start">Стартовая дата: {{$sphere->start ? $sphere->start->format('d.m.Y')  : ''}} </label>
        </div>
        <div class="form-group">
            <label for="end">Дата завершения: {{$sphere->end ?$sphere->end->format('d.m.Y')  : ''}}</label>
        </div>
        <div class="form-group">
            <label for="enabled">Отображается на сайте</label>
            <input type="checkbox" class="form-control" id="enabled" name="enabled" {{$sphere->enabled ? 'checked' : ''}}>
            <p></p>
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
    </form>

    <a href="{{route('spheres.edit', [$sphere->id])}}"><button>Изменить</button></a>
    <a href="{{route('spheres.index')}}"><button>К списку</button></a>
@endsection
