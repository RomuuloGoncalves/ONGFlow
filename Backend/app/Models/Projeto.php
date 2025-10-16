<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projeto extends Model
{
    /** @use HasFactory<\Database\Factories\ProjetoFactory> */
    use HasFactory;

    protected $table = 'projetos';

    protected $fillable = [
        'nome',
        'descricao',
        'data_inicio',
        'quantidade_maxima_voluntarios',
        'status',
        'id_ong',
    ];

    protected $hidden = [
    ];

    protected $casts = [
        'data_inicio' => 'date',
    ];

    protected $primaryKey = 'id';

    // relacoes
    public function ong()
    {
        return $this->belongsTo(Ong::class, 'id_ong');
    }

    public function habilidades()
    {
        return $this->belongsToMany(Habilidade::class, 'projeto_habilidade', 'projeto_id', 'id_habilidade');
    }
}
