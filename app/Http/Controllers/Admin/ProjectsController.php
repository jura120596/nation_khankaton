<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\SphereCreateRequestUpdate;
use App\Models\File;
use App\Models\MainBag;
use App\Models\MainBagFeature;
use App\Models\Project;
use App\Models\RegionProject;
use App\Models\Sphere;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Routing\Controller;

class ProjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $projects = (Sphere::query()->findOrFail($request->sphere_id))->subProjects;
        return view('projects.index', [
            'projects' => $projects,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('projects.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     * @internal param FormBuilder $formBuilder
     * @internal param Request $request
     */
    public function store(Request $request)
    {
        $params = $request->all();
        $project = (new RegionProject())->fill($params);
        $project->enabled = $request->enabled ? true : false;
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('spheres', 'public');
            $project->photo = $path;
        }
        if ($request->hasFile('file')) {
            /** @var UploadedFile $uF */
            $file = ($uF = $request->file('file'))->store('files', 'public');
            $file = File::query()->create(['file' => $file, 'name' => $uF->getClientOriginalName()]);
            $project->passport_file_id = $file->id;
        }
        $project->save();
        return view('projects.show', compact('project'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $project = RegionProject::findOrFail($id);
        return view('projects.show', compact('project'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit(int $id)
    {
        $project = RegionProject::find($id);

        return view('projects.edit', compact('project'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $project = RegionProject::findOrFail($id);
        $project->fill($request->all());
        $project->enabled = $request->enabled ? true : false;
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('spheres', 'public');
            $project->photo = $path;
        }
        if ($request->hasFile('file')) {
            /** @var UploadedFile $uF */
            $file = ($uF = $request->file('file'))->store('files', 'public');
            $file = File::query()->create(['file' => $file, 'name' => $uF->getClientOriginalName()]);
            $project->passport_file_id = $file->id;
        }
        $project->save();
        return view('projects.show', compact('project'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        RegionProject::findOrFail($id)->delete();
        return $this->index();
    }
}
