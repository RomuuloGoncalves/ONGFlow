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
            'descricao' => ['required', 'string', 'max:2000'],
            'quantidade_maxima_voluntarios' => ['required', 'integer', 'min:1'],
            'data_inicio' => ['required', 'date', 'after_or_equal:today'],
            'data_fim' => ['required', 'date', 'after:data_inicio'],
            'status' => ['required', 'string', 'in:ativo,cancelado,finalizado'],
            'ongs_id' => ['required', 'integer', 'exists:ongs,id'],
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
            'nome.required' => 'O campo nome do projeto é obrigatório.',

            'descricao.required' => 'O campo descrição é obrigatório.',
            'descricao.max' => 'A descrição não pode ter mais de 2000 caracteres.',

            'quantidade_maxima_voluntarios.required' => 'A quantidade máxima de voluntários é obrigatória.',
            'quantidade_maxima_voluntarios.integer' => 'A quantidade máxima de voluntários deve ser um número inteiro.',
            'quantidade_maxima_voluntarios.min' => 'O projeto deve aceitar pelo menos 1 voluntário.',

            'data_inicio.required' => 'A data de início é obrigatória.',
            'data_inicio.date' => 'O formato da data de início é inválido.',
            'data_inicio.after_or_equal' => 'A data de início não pode ser anterior a hoje.',

            'data_fim.required' => 'A data de fim é obrigatória.',
            'data_fim.date' => 'O formato da data de fim é inválido.',
            'data_fim.after' => 'A data de fim deve ser posterior à data de início.',

            'status.required' => 'O campo status é obrigatório.',
            'status.in' => 'O status do projeto é inválido. Valores aceitos: ativo, cancelado, finalizado.',

            'ongs_id.required' => 'O ID da ONG é obrigatório.',
            'ongs_id.integer' => 'O ID da ONG deve ser um número inteiro.',
            'ongs_id.exists' => 'A ONG especificada não foi encontrada.',
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
        throw new HttpResponseException(response()->json([
            'success'   => false,
            'message'   => 'Erro na validação dos dados do projeto.',
            'errors'    => $validator->errors()
        ], 422));
    }
}
