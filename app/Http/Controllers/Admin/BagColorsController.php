<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BagColorUpdateRequest;
use App\Http\Requests\BagColorCreateRequest;
use App\Models\BagColor;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

/**
 * Class BagColorsController
 * @package App\Http\Controllers
 */
class BagColorsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('bagcolors.index', [
            'colors' => BagColor::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('bagcolors.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param BagColorCreateRequest|Request $request
     * @return \Illuminate\Http\RedirectResponse
     * @internal param FormBuilder $formBuilder
     * @internal param Request $request
     */
    public function store(BagColorCreateRequest $request)
    {
        $params = $request->all();
        $color = (new BagColor())->fill($params);
        $color->is_picture = (bool) Arr::get($params, 'is_picture', 'false');
        $color->setPictures($request);
        $color->save();
        return view('bagcolors.show', compact('color'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $color = BagColor::find($id);
        return view('bagcolors.show', compact('color'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit(int $id)
    {
        $color = BagColor::find($id);
        return view('bagcolors.edit', compact('color'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(BagColorUpdateRequest $request, $id)
    {
        $color = BagColor::find($id);
        $color->fill($request->all());
        $color->is_picture = (bool) Arr::get($request->all(), 'is_picture', false);
        $color->setPictures($request);
        $color->save();
        return view('bagcolors.show', compact('color'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        BagColor::find($id)->delete();
        return $this->index();
    }
}
