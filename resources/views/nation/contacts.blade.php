@extends('layouts.nation')

@section('assets')
    @include('nation.assets')
@endsection

@section('body')
    @include('nation.nav')
    @include('nation.contacts_list')
{{--    @include('main.contacts')--}}
    @include('nation.footer')
@endsection
