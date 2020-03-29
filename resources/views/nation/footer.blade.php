<div class="tm-copyright">
    <div class="uk-container uk-container-center">
        <h2>Быстрые ссылки:</h2>
        <div class="row">
            @if($spheres = \App\Models\Sphere::enabled()->get())
            @foreach($spheres as $sphere)
                <div class="">
                <div class="card mb-5 border-0" style="width: 18rem;float: left">
                    <div class="card-body">
                        <div class="card-title" style="min-height: 50px !important;">
                            <h5>{{$sphere->title}}</h5>
                        </div>
                        <a href="{{route('sphere.main', ['sphere_id' => $sphere->id])}}" class="card-link">
                            <h6 class="card-subtitle mb-4 text-muted">Региональные проекты</h6>
                        </a>
                        @foreach($sphere->subProjects as $project)
                            @if($loop->index< 3)
                                <div style="min-height: 30px !important;">
                                    <a href="{{route('project.main', ['project_id' => $project->id])}}">
                                        <p class="card-text m-2" style="font-size: 10px">{{\Illuminate\Support\Str::words($project->title, 4)}}</p>
                                    </a>
                                </div>
                            @endif
                        @endforeach
                    </div>
                </div>
                </div>
            @endforeach
            @endif
        </div>
    </div>
</div>
