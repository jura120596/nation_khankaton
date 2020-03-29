
    <div class="block module static advantage-blocks radial-gradient container">
        <div class="head row" >
            <div style="width: 20%; height:inherit;
  display: flex;
  justify-content: center;
  flex-direction: column;"><img style="height: 150px; float: left" src="{{Storage::url($project->photo)}}"></div>
            <div class="title black text-uppercase teh-title h-75 float-left"
                 style="padding-left: 20px; vertical-align: center; line-height: 75px; width: 75%; text-align: left">
                <span style="color: dimgray; text-transform: none !important;">Региональный проект</span><br><span style="color: white; ">{{$project->title}}</span></div>
        </div>
        <br>
        <br>
        <div class="row">
            <span style="padding-bottom: 10px">Содержание:</span>
            {!!  $project->content!!}
        </div>
        <h2 class="row">Этапы реализации:</h2>
        <div class="row pb-5">
            <div class="list-group w-100">
                @foreach($project->steps as $step)
                <div class="list-group-item list-group-item-action flex-column align-items-start pb-4">
                    @if($step->photo)
                        <div class="image showable" style="max-height: 150px; overflow: hidden; cursor: pointer">
                            <img class="card-img-top" src="{{Storage::url($step->photo)}}" alt="{{$step->title}}" style="border-radius: 0;">
                        </div>
                        <br>
                    @endif
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">Объект: {{$step->object}}</h5>
                        <small>План: {{$step->end->format('d.m.Y')}}</small>
                    </div>
                    <div  class="card-body mb-1 pb-3">
                        <h5 class="card-title">Запланированные работы:</h5>
                        <p class="pl-3 card-text">{{\Illuminate\Support\Str::ucfirst($step->action)}}</p>
                    </div>
                    <p class="mb-1 pb-3">Cостояние:</p>
                        @if(!$step->completed)
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped {{\Carbon\Carbon::now()->gt($step->end) ? 'bg-danger' : 'bg-success'}}" role="progressbar"
                                     style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        @else
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped  {{$step->fact_end->gt($step->end) ? 'bg-danger' : 'bg-success'}}"
                                     role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        @endif
                </div>
                @endforeach
            </div>
        </div>

    </div>
