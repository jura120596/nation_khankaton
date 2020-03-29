<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\NewsUpdateRequest;
use App\Http\Requests\NewsCreateRequest;
use App\Models\News;
use Illuminate\Http\Request;

/**
 * Class NewsController
 * @package App\Http\Controllers
 */
class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('news.index', [
            'newses' => News::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('news.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param NewsCreateRequest|Request $request
     * @return \Illuminate\Http\RedirectResponse
     * @internal param FormBuilder $formBuilder
     * @internal param Request $request
     */
    public function store(NewsCreateRequest $request)
    {
        $params = $request->all();
        $news = (new News())->fill($params);
        $news->setPictures($request);
        $news->save();
        return view('news.show', compact('news'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $news = News::findOrFail($id);
        return view('news.show', compact('news'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit(int $id)
    {
        $news = News::findOrFail($id);
        return view('news.edit', compact('news'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(NewsUpdateRequest $request, $id)
    {
        $news = News::find($id);
        $news->fill($request->all());
        $news->setPictures($request);
        $news->save();
        return view('news.show', compact('news'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        News::find($id)->delete();
        return $this->index();
    }
}
