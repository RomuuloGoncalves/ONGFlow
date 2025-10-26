<?php

namespace App\Http\Requests\Endereco;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'cep'          => ['required', 'string', 'max:9'],
            'logradouro'   => ['required', 'string', 'max:255'],
            'numero'       => ['required', 'string', 'max:10'],
            'complemento'  => ['nullable', 'string', 'max:255'],
            'bairro'       => ['required', 'string', 'max:255'],
            'cidade'       => ['required', 'string', 'max:255'],
            'estado'       => ['required', 'string', 'max:02'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'cep.required'         => 'O campo CEP é obrigatório.',
            'cep.string'           => 'O CEP deve ser um texto.',
            'cep.max'              => 'O CEP não pode ter mais de 9 caracteres.',

            'logradouro.required'  => 'O campo logradouro é obrigatório.',
            'logradouro.string'    => 'O logradouro deve ser um texto.',
            'logradouro.max'       => 'O logradouro não pode ter mais de 255 caracteres.',

            'numero.required'      => 'O campo número é obrigatório.',
            'numero.string'        => 'O número deve ser um texto.',
            'numero.max'           => 'O número não pode ter mais de 10 caracteres.',

            'complemento.string'   => 'O complemento deve ser um texto.',
            'complemento.max'      => 'O complemento não pode ter mais de 255 caracteres.',

            'bairro.required'      => 'O campo bairro é obrigatório.',
            'bairro.string'        => 'O bairro deve ser um texto.',
            'bairro.max'           => 'O bairro não pode ter mais de 255 caracteres.',

            'cidade.required'      => 'O campo cidade é obrigatório.',
            'cidade.string'        => 'A cidade deve ser um texto.',
            'cidade.max'           => 'A cidade não pode ter mais de 255 caracteres.',

            'estado.required'      => 'O campo estado é obrigatório.',
            'estado.string'        => 'O estado deve ser um texto.',
            'estado.max'           => 'O estado não pode ter mais de 02 caracteres.',
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator
     * @return void
     *
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Erro de validação.',
            'errors'  => $validator->errors()
        ], 422));
    }
}
