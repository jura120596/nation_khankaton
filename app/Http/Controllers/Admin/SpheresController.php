<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SphereCreateRequest;
use App\Http\Requests\SphereCreateRequestUpdate;
use App\Models\File;
use App\Models\MainBag;
use App\Models\Sphere;
use Illuminate\Http\UploadedFile;
use Kris\LaravelFormBuilder\FormBuilder;

class SpheresController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('spheres.index', [
            'spheres' => Sphere::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param FormBuilder $form
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('spheres.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param SphereCreateRequest $request
     * @return \Illuminate\Http\RedirectResponse
     * @internal param FormBuilder $formBuilder
     * @internal param Request $request
     */
    public function store(SphereCreateRequest $request)
    {
        $params = $request->all();
        $sphere = (new Sphere())->fill($params);
        $path = $request->file('photo')->store('spheres', 'public');
        $sphere->photo = $path;
        $path = $request->file('logo')->store('spheres', 'public');
        $sphere->logo = $path;
        if ($request->hasFile('file')) {
            /** @var UploadedFile $uF */
            $file = ($uF = $request->file('file'))->store('files', 'public');
            $file = File::query()->create(['file' => $file, 'name' => $uF->getClientOriginalName()]);
            $sphere->passport_file_id = $file->id;
        }
        $sphere->enabled = $request->enabled ? true : false;
        $sphere->save();
        return view('spheres.show', compact('sphere'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $sphere = Sphere::find($id);
        return view('spheres.show', compact('sphere'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit(int $id)
    {
        $sphere = Sphere::find($id);
        return view('spheres.edit', compact('sphere'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param SphereCreateRequestUpdate $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(SphereCreateRequestUpdate $request, $id)
    {
        $sphere = Sphere::find($id);
        $sphere->fill($request->all());
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('spheres', 'public');
            $sphere->photo = $path;
        }
        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('spheres', 'public');
            $sphere->logo = $path;
        }
        if ($request->hasFile('file')) {
            /** @var UploadedFile $uF */
            $file = ($uF = $request->file('file'))->store('files', 'public');
            $file = File::query()->create(['file' => $file, 'name' => $uF->getClientOriginalName()]);
            $sphere->passport_file_id = $file->id;
        }
        $sphere->enabled = $request->enabled ? true : false;
        $sphere->save();
        return view('spheres.show', compact('sphere'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Sphere::findOrFail($id)->delete();
        return $this->index();
    }
}
