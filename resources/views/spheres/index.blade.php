@extends('layouts.layout')

@section('content')
    <h1>Сферы деятельности</h1>
    <a href="{{url('spheres/create')}}">Добавить сферу</a>
    <table class="table">
        <thead class="thead-dark">
        <tr>
            <th scope="col">Заголовок</th>
            <th scope="col">Отображается на сайте</th>
            <th scope="col">Фото</th>
            <th scope="col">Изменить</th>
            <th scope="col">Удалить</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        @if (Session::has('message'))
            <div class="alert alert-info">{{ Session::get('message') }}</div>
        @endif
        @foreach($spheres as $sphere)
            <tr>
                <td scope="row" style="text-align: left;"><a href="{{url('spheres', [$sphere->id])}}">{{$sphere->title}}</a></td>
                <td scope="row"><input type="checkbox" name="" {{$sphere->enabled ? 'checked="checked"' : ''}}/></td>
                <td scope="row"><img src="{{Storage::disk('local')->url($sphere->photo)}}" style="max-height: 100px; border: 1px solid;"></td>
                <td><a href="{{route('spheres.edit', [$sphere->id])}}">Изменить</a></td>
                <td>
                    <form action="{{route('spheres.destroy', [$sphere->id])}}" method="POST">
                        <input type="hidden" name="_method" value="DELETE">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="submit" class="btn btn-danger" value="Удалить"/>
                    </form>
                </td>
                <td><a href="{{route('projects.index', ['sphere_id' => $sphere->id])}}">Региональные проекты</a></td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endsection
