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
            'iniciador' => ['required', 'in:ong,voluntario'],
            'status' => ['required', 'in:pendente,aceito,recusado'],
            'mensagem' => ['required', 'string', 'max:1000'],
            'data_resposta' => ['nullable', 'date', 'after_or_equal:data_criacao'],
            'id_ong' => ['required', 'integer', 'exists:ongs,id'],
            'id_voluntario' => ['required', 'integer', 'exists:voluntarios,id'],
            'id_projeto' => ['required', 'integer', 'exists:projetos,id'],
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
            'iniciador.required' => 'É necessário especificar quem iniciou o convite (ong ou voluntario).',
            'iniciador.in' => 'O iniciador do convite deve ser "ong" ou "voluntario".',

            'status.required' => 'O status do convite é obrigatório.',
            'status.in' => 'O status do convite é inválido. Valores aceitos: pendente, aceito, recusado.',

            'mensagem.required' => 'O campo mensagem é obrigatório.',
            'mensagem.max' => 'A mensagem não pode ter mais de 1000 caracteres.',

            'data_resposta.date' => 'O formato da data de resposta é inválido.',
            'data_resposta.after_or_equal' => 'A data de resposta não pode ser anterior à data de criação.',

            'id_ong.required' => 'O ID da ONG é obrigatório.',
            'id_ong.integer' => 'O ID da ONG deve ser um número inteiro.',
            'id_ong.exists' => 'A ONG selecionada não existe.',

            'id_voluntario.required' => 'O ID do voluntário é obrigatório.',
            'id_voluntario.integer' => 'O ID do voluntário deve ser um número inteiro.',
            'id_voluntario.exists' => 'O voluntário selecionado não existe.',

            'id_projeto.required' => 'O ID do projeto é obrigatório.',
            'id_projeto.integer' => 'O ID do projeto deve ser um número inteiro.',
            'id_projeto.exists' => 'O projeto selecionado não existe.',
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
            'message'   => 'Erro na validação dos dados do convite.',
            'errors'    => $validator->errors()
        ], 422));
    }
}
