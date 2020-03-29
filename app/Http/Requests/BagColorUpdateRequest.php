<?php

namespace App\Http\Requests;


class BagColorUpdateRequest extends BagColorCreateRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = parent::rules();
        return array_merge($rules, [
            'main_picture' => str_replace('required|', '', $rules['main_picture']),
            'w_picture' => str_replace('required|', '', $rules['w_picture']),
            'v_picture' => str_replace('required|', '', $rules['v_picture']),
            'icon' => str_replace('required|', '', $rules['icon']),
        ]);
    }
}
