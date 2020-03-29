<?php

namespace App\Http\Controllers;

use App\Models\BagColor;
use App\Models\News;
use App\Models\MainBag;
use App\Models\Sphere;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class SphereController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function sphere(Request $request)
    {
        $sphere = Sphere::findOrFail($request->sphere_id);
        return view('spheres.site', [
            'sphere' => $sphere
        ]);
    }

    public function manager()
    {
        return view('layouts.layout');
    }
}
