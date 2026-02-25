<?php

namespace App\Http\Requests\Pagos;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule; // Import Rule for enum validation

class UpdateForfaitRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Authorization handled by 'admin' middleware
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nombre' => 'sometimes|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'sometimes|numeric|min:0',
            'viajes_incluidos' => 'sometimes|integer|min:0',
            'dias_validez' => 'sometimes|integer|min:1',
            'distancia_maxima' => 'sometimes|numeric|min:0',
            'es_vip' => 'sometimes|boolean',
            'estado' => ['sometimes', Rule::in(['activo', 'inactivo'])],
        ];
    }
}
