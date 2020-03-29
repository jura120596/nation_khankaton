@extends('layouts.nation')

@section('assets')
    @include('nation.assets')
@endsection

@section('body')
    @include('nation.nav')
    @include('nation.slides')
{{--    @include('main.video')--}}
{{--    @include('main.contacts')--}}
    @include('nation.footer')
@endsection
