
    <div class="block module static advantage-blocks radial-gradient container">
        <div class="head row" >
            <div class="title black text-uppercase teh-title h-75 float-left"
                 style=" vertical-align: center; line-height: 75px; text-align: left">
                <span style="color: dimgray; text-transform: none !important;">Национальный проект</span><br><span style="color: white">{{$sphere->title}}</span></div>
        </div>
        <br>
        <div class="row">
            <span>Сроки реализации: {{$sphere->start->format('m.Y') . ' - ' . $sphere->end->format('m.Y')}}</span>
        </div>
        <br>
        <div class="row">

            <span>Цели: </span>
                {!!  $sphere->target!!}
        </div>
        <h2 class="row">Региональные проекты:</h2>
        <div class="content wrap row px-3 px-md-0">
            <div class="row ">
                @foreach($sphere->subProjects()->where('enabled', true)->get() as $project)
                    <div class="block mb-3 mb-md-4  col-lg-5 col-xl-4 project-card"
                         data-link="{{route('project.main', ['project_id' => $project->id])}}">
                        <div class="media d-block">
                            <div class="image" style="max-height: 150px"><img src="{{Storage::url($project->photo)}}"></div>
                            <div class="index right text-white"><span>{{$loop->index+1}}</span></div>
                        </div>
                        <div class="text p-3" style="min-height: 100%">
                            <div class="title text-lg-right pb-2"><span>{{$project->title}}</span></div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
