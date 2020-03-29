@extends('layouts.nation')

@section('assets')
    @include('nation.assets')
@endsection

@section('body')
    @include('nation.nav')
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{route('sphere.main', ['sphere_id' => $project->sphere_id])}}">{{$project->sphere->title}}</a></li>
            <li class="breadcrumb-item active" aria-current="page">Региональный проект</li>
        </ol>
    </nav>
    @include('projects.project')
    @include('nation.footer')
@endsection
