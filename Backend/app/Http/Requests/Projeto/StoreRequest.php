<?php

namespace App\Http\Requests\Projeto;

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
            'nome' => ['required', 'string', 'max:255'],
            'descricao' => ['required', 'string', 'max:255'],
            'quantidade_maxima_voluntarios' => ['required', 'integer'],
            'data_inicio' => ['required', 'date'],
            'status' => ['required', 'string', 'in:ativo,cancelado,finalizado'],
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
            'nome.required' => 'O campo nome é obrigatório',

            'descricao.required' => 'O campo descrição é obrigatório.',

            'data-inicio.required' => 'A data de início é obrigatória.',
            'data-inicio.date' => 'Formato de data inválido.',

            'sigla.required' => 'O campo sigla é obrigatório.',

        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        // Isso impede o redirecionamento padrão.
        throw new HttpResponseException(response()->json([
            'success'   => false,
            'message'   => 'Dados inválidos',
            'errors'    => $validator->errors()
        ], 422));
    }
}
