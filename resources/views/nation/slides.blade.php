<div style="margin-top: -10px">
    <header>
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                @foreach($spheres as $sphere)
                    <li data-target="#carouselExampleIndicators" data-slide-to="{{$loop->index}}" class="{{$loop->first ? 'active ' : ''}}"></li>
                @endforeach
            </ol>
            <div class="carousel-inner" role="listbox">
                @foreach($spheres as $sphere)
                    <div class="carousel-item {{$loop->first ? 'active' : ''}}" style="background-image: url('{{Storage::url($sphere->photo)}}');"
                         data-link="{{route('sphere.main', ['sphere_id' => $sphere->id])}}">
                        <div class="carousel-caption d-none d-md-block">
                            <h2 style="color: white; text-transform: uppercase">{{$sphere->title}}</h2>
                            <h4 style="color: white; text-transform: uppercase">{{$sphere->description}}</h4>
                        </div>
                    </div>
                @endforeach
                <!-- Slide One - Set the background image for this slide in the line below -->
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </header>
</div>
