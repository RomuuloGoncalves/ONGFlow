<?php

namespace App\Http\Requests\Convite;

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
            'iniciador' => ['required', 'in:pendente,aceito,recusado'],
            'mensagem' => ['required', 'string'],
            'data_criacao' => ['required', 'date'],
            'data_resposta' => ['required', 'date'],
            // 'ongs_id' => ['required', 'integer', 'exists:ong,id'],
            // 'voluntarios_id' => ['required', 'integer', 'exists:voluntarios,id'],
            // 'projetos_id' => ['required', 'integer', 'exists:projetos,id'],
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
            'data_criacao.required' => 'A data de criação é obrigatória.',
            'data_criacao.date' => 'Formato de data inválido.',
            
            'data_resposta.required' => 'A data de reposta é obrigatória.',
            'data_resposta.date' => 'Formato de data inválido.',

            'mesnagem.required' => 'O campo mensagem é obrigatório.',

            'iniciador.required' => 'O campo iniciador é obrigatório.',
            'iniciador.in' => 'O iniciador deve ser "pendente", "aceito" ou "recusado".',
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
