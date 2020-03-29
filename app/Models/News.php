<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

/**
 * Class News
 * @package App\Models
 * @property String title
 * @property String description
 * @property String photo
 */
class News extends Model
{
    protected $table = 'newses';
    protected $fillable = [
        'title', 'description', 'photo',
    ];

    public function setPictures(Request $request) {
        foreach ([
            'photo',
        ] as $picture) {
            if ($request->hasFile($picture)) {
                $this->$picture = $request->file($picture)->store('newses', 'public');
            }
        }
    }
}
