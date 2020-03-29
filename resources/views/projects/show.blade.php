@extends('layouts.layout')

@section('content')
    <h1>Просмотр проекта</h1>
    <hr>
    <div>
        <img  style="max-width: 150px" src="{{Storage::url($project->photo)}}">
    </div>
    <div class="form-group">
        <label for="feature">Название: {{$project->title .'('. \App\Models\Sphere::find($project->sphere_id)->title.')'}}
        </label>
    </div>
    <div class="form-group">
        <label for="enabled">Отображается на сайте</label>
        <input type="checkbox" class="form-control" id="enabled" name="enabled" {{$project->enabled ? 'checked' : ''}}>
        <p></p>
    </div>
    <a href="{{route('projects.edit', [$project->id])}}"><button>Изменить</button></a>
    <a href="{{route('spheres.index')}}"><button>К списку нац.проектов</button></a>
    <td class="m-0 row " style="max-width: 80% !important;">
        <span class="row" style="text-align: left"><h1>Этапы проекта</h1></span>
        <table class="table" style="max-width: 75%">
            <thead>
            <tr>
                <th scope="col">Объект</th>
                <th scope="col">Фото</th>
                <th scope="col">Мероприятие</th>
                <th scope="col">Дата реализации</th>
                <th scope="col">Выполнено</th>
                <th scope="col">Выполнить</th>
                <th scope="col">Удалить</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            @foreach($project->steps as $step)
            <tr>
                <td>{{$step->object}}</td>
                <td scope="row">
                    <img src="{{Storage::disk('local')->url($step->photo)}}" style="max-width: 100px; border: 1px solid;">
                    <form action="{{route('project.add_step_photo', ['step_id'=> $step->id])}}" method="POST"  enctype="multipart/form-data">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <div class="form-group">
                            <input type="file" width="150px" height="100px" class="form-control" id="picture"
                                   name="photo">
                        </div>
                        <div class="form-group">
                            <input type="submit" class="btn btn-success" value="Обновить"/>
                        </div>
                    </form>
                </td>
                <td>{{$step->action}}</td>
                <td>{{$step->end->format('m.Y')}}</td>
                <td><input type="checkbox" disabled {{$step->completed ? ' checked' : ''}}/></td>
                <td>
                    <form action="{{route('project.complete_step', ['step_id' => $step->id])}}" method="POST">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="submit" class="btn btn-success" value="Выполнить"/>
                    </form>
                </td>
                <td>
                    <form action="{{route('project.delete_step', ['step_id' => $step->id])}}" method="POST">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="submit" class="btn btn-danger" value="Удалить"/>
                    </form>
                </td>
            </tr>
            @endforeach
            </tbody>
            <tbody>
            <form action="{{route('project.add_step', ['project_id'=> $project->id])}}" method="POST"  enctype="multipart/form-data">
                <input type="hidden" name="project_id" value="{{$project->id}}"/>
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <tr>
                    <td>
                        <div class="form-group">
                            <input type="text" width="150px" height="100px" class="form-control" id="object"
                               name="object" value="{{request('object')}}">
                        </div>
                    </td>
                    <td>
                        <div class="form-group">
                            <input type="file" width="150px" height="100px" class="form-control" id="picture"
                                   name="photo">
                        </div>
                    </td>
                    <td>
                        <div class="form-group">
                            <input type="text" width="150px" height="100px" class="form-control" id="action"
                               name="action" value="{{request('action')}}">
                        </div>
                    </td>
                    <td>
                        <div class="form-group">
                            <input type="date" width="150px" height="100px" class="form-control" id="end"
                                   {{request('end') ? ' value=' . request('end')  : ''}}  name="end">
                        </div>
                    </td>
                    <td></td>
                    <td>
                        <input type="submit" class="btn btn-success" value="Добавить"/>
                    </td>
                </tr>
            </form>
            </tbody>
        </table>
        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
    </div>
@endsection
