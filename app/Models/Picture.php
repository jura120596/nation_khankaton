<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

/**
 * Class Picture
 * @package App\Models
 * @property String $category
 * @property String $picture
 */
class Picture extends Model
{
    protected $fillable = [
        'category',
    ];
    public function fill(array $attributes)
    {
        $model = parent::fill($attributes);
        $model->category = $model->category ? : '';
        return $model;
    }

    public function setPictures(Request $request) {
        foreach ([
            'picture',
        ] as $picture) {
            if ($request->hasFile($picture)) {
                $this->$picture = $request->file($picture)->store('pictures', 'public');
            }
        }
    }
}
