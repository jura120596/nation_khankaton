<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Intervention\Image\Facades\Image;

class RegionProject extends Project
{
    protected $table = 'projects';
    public static $classLevel = self::REGIONAL_LEVEL;
    protected $fillable = [
        'title', 'content', 'sphere_id'
    ];

    public function save(array $options = [])
    {
        if ($this->isDirty('photo')) {
            ($image = Image::make($path = \Storage::disk('public')->path($this->photo)))
                ->resize(360,(int)360 * ($image->getHeight()/$image->getWidth()));
            \Storage::delete($this->photo);
            $image->save($path);
        }
        return parent::save($options);
    }

    public function sphere() : BelongsTo
    {
        return $this->belongsTo(Sphere::class);
    }

    public function steps(): HasMany
    {
        return $this->hasMany(ProjectStep::class, 'project_id')->orderBy('end', 'desc');
    }

}
