<div class="b-rev mb-5 mt-5">
    <div class="container mt-0">
        <h2>Фотоматериалы: </h2>
        <div class="rev-foto row mt-0">
            <div id="collage" class="clear mt-0">
                @foreach(\App\Models\CatalogPicture::where(['category' => ''])->get() as $p)
                    <img width="{{($i = \Intervention\Image\Facades\Image::make(Storage::disk('public')->path($p->picture)))->width()}}px" height="{{$i->height()}}px"  src="{{Storage::url($p->picture)}}">
                @endforeach
            </div>
        </div>
    </div>
</div>
