<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\NewsUpdateRequest;
use App\Http\Requests\NewsCreateRequest;
use App\Http\Requests\PictureCreateRequest;
use App\Models\News;
use App\Models\Picture;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class PicturesController
 * @package App\Http\Controllers
 */
class PicturesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('pictures.index', [
            'pictures' => Picture::orderBy('category')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('pictures.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @internal param FormBuilder $formBuilder
     * @internal param Request $request
     * @param PictureCreateRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(PictureCreateRequest $request)
    {
        $params = $request->all();
        $color = (new Picture())->fill($params);
        $color->setPictures($request);
        $color->save();
        return $this->index();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Picture::find($id)->delete();
        return $this->index();
    }
}
