<?php

namespace App\Http\Controllers;

use App\Models\BagColor;
use App\Models\News;
use App\Models\MainBag;
use App\Models\Sphere;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class NationController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function nation()
    {
        return view('nation.nation', [
            'spheres' => Sphere::query()->enabled()->get(),
        ]);
    }

    public function manager()
    {
        return view('layouts.layout');
    }

    public function docs()
    {
        return view('nation.materials');
    }
    public function photos()
    {
        return view('nation.photos');
    }
    public function news()
    {
        return view('nation.news', ['newses' => News::orderBy('created_at', 'desc')->get()]);
    }
    public function contacts()
    {
        return view('nation.contacts', [
            'spheres' => Sphere::query()->enabled()->get(),
        ]);
    }
}
