@extends('layouts.layout')

@section('content')
    <h1>Новости</h1>
    <a href="{{route('newses.create')}}">Добавить новость</a>
    <table class="table">
        <thead class="thead-dark">
        <tr>
            <th scope="col">Заголовок</th>
            <th scope="col">Иконка</th>
            <th scope="col">Дата</th>
            <th scope="col">Изменить</th>
            <th scope="col">Удалить</th>
        </tr>
        </thead>
        <tbody>
        @if (Session::has('message'))
            <div class="alert alert-info">{{ Session::get('message') }}</div>
        @endif
        @foreach($newses as $news)
            <tr>
                <td scope="row" style="text-align: left;">{{\Illuminate\Support\Str::words($news->title, 10)}}</td>
                <td scope="row">
                        <div>
                            <img style="width: 40px; border-radius:50%; height: 40px;" src="{{Storage::url($news->photo)}}">
                        </div>
                </td>
                <td scope="col">{{$news->created_at->format('d.m.Y H:i')}}</td>
                <td><a href="{{route('newses.edit', ['news_id' => $news->id])}}">Изменить</a></td>
                <td>
                    <form action="{{route('newses.destroy',['news_id' => $news->id])}}" method="POST">
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
