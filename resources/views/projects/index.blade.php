@extends('layouts.layout')

@section('content')
    <h1>Региональные проекты</h1>
    <a href="{{route('projects.create')}}">Добавить проект</a>
    <table class="table">
        <thead class="thead-dark">
        <tr>
            <th scope="col">Название</th>
            <th scope="col">Отображается на сайте</th>
            <th scope="col">Изменить</th>
            <th scope="col">Удалить</th>
        </tr>
        </thead>
        <tbody>
        @if (Session::has('message'))
            <div class="alert alert-info">{{ Session::get('message') }}</div>
        @endif
        @foreach($projects as $project)
            <tr>
                <td><a href="{{route('projects.show',  [$project->id])}}">{{$project->title}}</a></td>
                <td scope="row"><input type="checkbox" name="" {{$project->enabled ? 'checked="checked"' : ''}}/></td>
                <td><a href="{{route('projects.edit',  [$project->id])}}">Изменить</a></td>
                <td>
                    <form action="{{route('projects.destroy', [$project->id])}}" method="POST">
                        <input type="hidden" name="_method" value="DELETE">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="submit" class="btn btn-danger" value="Удалить"/>
                    </form>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endsection
