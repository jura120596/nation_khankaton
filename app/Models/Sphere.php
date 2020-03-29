<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Intervention\Image\Facades\Image;

class Sphere extends Model
{
    protected $fillable = [
        'title',
        'description',
        'start',
        'end',
        'target',
        'contacts',
    ];

    protected $dates = [
        'start', 'end',
    ];

    /**
     * @param Builder $builder
     * @return Builder
     */
    public function scopeEnabled(Builder $builder) : Builder
    {
        return $builder->where('enabled', true);
    }

    /**
     * @return HasMany
     */
    public function subProjects() : HasMany
    {
        return $this->hasMany(RegionProject::class);
    }
    /**
     * @return HasMany
     */
    public function passport() : BelongsTo
    {
        return $this->belongsTo(File::class, 'passport_file_id');
    }

    public function save(array $options = [])
    {
        if ($this->isDirty('photo')) {
            $image = Image::make($path = \Storage::disk('public')->path($this->photo))->resize(2000, 1500);
            \Storage::delete($this->photo);
            $image->save($path);
        }
//        if ($this->isDirty('logo')) {
//            ($image = Image::make($path = \Storage::disk('public')->path($this->logo)))->resize(400,(int)400 * ($image->getHeight()/$image->getWidth()));
//            \Storage::delete($this->logo);
//            $image->save($path);
//        }
        $this->target =  $this->target ? : '';
        return parent::save($options);
    }
}
