<div style="margin-top: -10px" class="">

    <nav id="docs" class="navbar navbar-light bg-light p-5">
        <h2 class="row">Паспорта проектов:</h2>
        <nav class="nav nav-pills flex-column">
            @foreach($spheres = \App\Models\Sphere::enabled()->get() as $sphere)
                <?php $tag = $sphere->passport ? 'a' : 'span'?>
            <{!! $tag !!} class="nav-link" href="{{$sphere->passport ? \Illuminate\Support\Facades\Storage::url($sphere->passport->file): '#'}}" target="_blank">{{$sphere->title}}</{!! $tag !!}>
            <nav class="nav nav-pills flex-column">
                @foreach($projects = $sphere->subProjects()->where('enabled', true)->get() as $project)
                    <?php $tag = $project->passport ? 'a' : 'span'?>
                <{!! $tag !!} class="nav-link ml-3 my-1" href="{{$project->passport ? \Illuminate\Support\Facades\Storage::url($project->passport->file): '#'}}" target="_blank">{{$project->title}}</{!! $tag !!}>
                @endforeach
            </nav>
            @endforeach
        </nav>
    </nav>
</div>
