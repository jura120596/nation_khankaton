@extends('layouts.nation')

@section('assets')
    @include('nation.assets')
@endsection

@section('body')
    @include('nation.nav')
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{route('nation.main')}}">Главная</a></li>
            <li class="breadcrumb-item active" aria-current="page">Национальный проект</li>
        </ol>
    </nav>
    @include('spheres.sphere')
    @include('nation.footer')
@endsection
