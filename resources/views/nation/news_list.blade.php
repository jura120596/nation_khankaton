<div class="b-rev mb-5 mt-5">
    <div class="container mt-0">
        <div class="row">
        @foreach($newses as $news)
            <div class="col-sm-4 p-0">
            <div class="card border-0" style="border-radius: 0">
                <img class="card-img-top" src="{{Storage::url($news->photo)}}" alt="{{$news->title}}" style="height: 180px; border-radius: 0;">
                <div class="card-body">
                    <h5 class="card-title" style="height: 30px">{{\Illuminate\Support\Str::words($news->title,5)}}</h5>
                    <p class="card-text" style="height: 80px">{!! preg_replace('/(<[^<>]+>)*/', '', \Illuminate\Support\Str::words($news->description, 20)) !!}</p>
                    <a href="#" class="float-right" data-toggle="modal" data-target="#news{{$news->id}}">Читать дальше...</a>
                </div>
            </div>
            </div>
        @endforeach
        @foreach($newses as $news)
            <div class="modal fade" id="news{{$news->id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg"  role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{{$news->title}}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Закрыть">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <img class="card-img-top" src="{{Storage::url($news->photo)}}" alt="{{$news->title}}" style="border-radius: 0;">
                            {!!  $news->description!!}
                        </div>
                        <div class="modal-footer">
                            <a href="#" class="" data-dismiss="modal">Закрыть</a>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
        </div>
    </div>
</div>
