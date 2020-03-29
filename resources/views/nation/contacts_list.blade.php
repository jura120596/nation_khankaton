<div style="margin-top: -10px" class="p-5">

    <nav id="docs" class="navbar-light bg-light p-5">
        <h2 class="row">Контакты:</h2>
        <nav class="nav nav-pills flex-column">
            @foreach($spheres = \App\Models\Sphere::enabled()->get() as $sphere)
                @if($sphere->contacts)
                    <span class="nav-link"><h3>{{$sphere->title}}</h3></span>
                    <nav class="nav nav-pills flex-column">
                       {!! $sphere->contacts !!}
                    </nav>
                @endif
            @endforeach
        </nav>
    </nav>
</div>
