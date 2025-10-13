<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Convite extends Model
{
    /** @use HasFactory<\Database\Factories\OngFactory> */
    use HasApiTokens, HasFactory;

    protected $table = 'convites';

    protected $fillable = [
        'iniciador',
        'mensagem',
        'data_criacao',
        'data_resposta',
        // 'ong_id',
        // 'voluntario_id',
        // 'projeto_id',
    ];

    protected $hidden = [
    ];

    protected $casts = [
        'data_criacao' => 'date',
        'data_resposta' => 'date',
    ];

    protected $primaryKey = 'id';

    // public function ong()
    // {
    //     return $this->belongsTo(Ong::class, 'ong_id');
    // }

    // public function voluntario()
    // {
    //     return $this->belongsTo(Voluntario::class, 'Voluntario_id');
    // }

    // public function projeto()
    // {
    //     return $this->belongsTo(Projeto::class, 'Projeto_id');
    // }

}
