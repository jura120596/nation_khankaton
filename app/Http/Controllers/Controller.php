<?php

namespace App\Http\Controllers;

use App\Models\BagColor;
use App\Models\News;
use App\Models\MainBag;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function main()
    {
        return view('main.shop', [
            'bags' => MainBag::take(3)->get(),
            'firstBag' => BagColor::firstOrNew([]),
            'bagColors' => BagColor::all(),
            'firstCh' => News::firstOrNew([]),
            'chColors' => News::all(),
        ]);
    }
}
