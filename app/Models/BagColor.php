<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

/**
 * Class BagColor
 * @package App\Models
 * @property String $name
 * @property String $class
 * @property String $main_picture
 * @property String $w_picture
 * @property String $v_picture
 * @property boolean $is_picture
 * @property String $icon
 */
class BagColor extends Model
{
    protected $fillable = [
        'name',
        'class',
    ];

    public function setPictures(Request $request) {
        foreach ([
            'main_picture',
            'w_picture',
            'v_picture',
            'icon',
        ] as $picture) {
            if ($request->hasFile($picture)) {
                $this->$picture = $request->file($picture)->store('bag-colors', 'public');
                switch ($picture) {
                    case 'w_picture':
                    case 'v_picture':
                        $image = Image::make($path = \Storage::disk('public')->path($this->$picture))->resize(800, 1000);
                        \Storage::delete($this->$picture);
                        $image->save($path);
                        break;
                    case 'icon':
                        $image = Image::make($path = \Storage::disk('public')->path($this->$picture))->resize(70, null, function ($constraint) {
                            $constraint->aspectRatio();
                        });
                        \Storage::delete($this->$picture);
                        $image->save($path);
                        break;
                    default:
                        break;
                }
            }
        }
    }
}
