<?php

namespace App\Http\Controllers;

use App\Models\BagColor;
use App\Models\News;
use App\Models\MainBag;
use App\Models\ProjectStep;
use App\Models\RegionProject;
use App\Models\Sphere;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ProjectController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function project(Request $request)
    {
        $project = RegionProject::findOrFail($request->project_id);
        return view('projects.site', [
            'project' => $project
        ]);
    }
    public function addStep(Request $request)
    {
        $project = RegionProject::query()->findOrFail($request->project_id);
        $step = new ProjectStep($request->all());
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('spheres', 'public');
            $step->photo = $path;
        }
        $project->steps()->save($step);
        return redirect(route('projects.show', ['project_id' => $project->id]));
    }
    public function addStepPhoto(Request $request)
    {
        $step = ProjectStep::query()->findOrFail($request->step_id);
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('spheres', 'public');
            $step->photo = $path;
        }
        $step->save();
        return redirect(route('projects.show', ['project_id' => $step->project_id]));
    }

    public function completeStep(Request $request)
    {
        ($projectStep = ProjectStep::findOrFail($request->step_id))->complete();
        return redirect(route('projects.show', ['project_id' => $projectStep->project->id]));
    }
    public function deleteStep(Request $request)
    {
        ($projectStep = ProjectStep::findOrFail($request->step_id))->delete();
        return redirect(route('projects.show', ['project_id' => $projectStep->project->id]));
    }
}
