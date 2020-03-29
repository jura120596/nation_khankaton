@extends('layouts.layout')

@section('content')
    <h1>Изображения</h1>
    <a href="{{url('pictures/create')}}">Добавить картинку</a>
    <table class="table w-75">
        <thead class="thead-dark">
        <tr>
            <th scope="col">Картинка</th>
            <th scope="col">Удалить</th>
        </tr>
        </thead>
        <tbody>
        @if (Session::has('message'))
            <div class="alert alert-info">{{ Session::get('message') }}</div>
        @endif
        @foreach($pictures as $picture)
            <tr>
                <td scope="row">
                        <div>
                            <img style="width: 40px; border-radius:50%; height: 40px;" src="{{Storage::url($picture->picture)}}">
                        </div>
                </td>
                <td>
                    <form action="{{url('pictures', [$picture->id])}}" method="POST">
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
