@extends('layouts.nation')

@section('assets')
    @include('nation.assets')
@endsection

@section('body')
    @include('nation.nav')
    @include('nation.news_list')
{{--    @include('main.contacts')--}}
    @include('nation.footer')
@endsection
