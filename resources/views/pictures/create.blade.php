@extends('layouts.layout')

@section('content')
    <h1>Добавление картинки</h1>
    <hr>
    <form action="{{url('pictures')}}" method="post" enctype="multipart/form-data">
        {{ csrf_field() }}
        <div class="form-group">
            <label for="picture">Картинка</label>
            <input type="file" width="150px" height="100px" class="form-control" id="picture"
                   name="picture">
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
    <br>
    <a href="{{route('pictures.index')}}"><button  class="btn btn-primary">К списку</button></a>
@endsection
