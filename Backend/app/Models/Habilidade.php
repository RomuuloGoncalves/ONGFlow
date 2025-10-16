<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Habilidade extends Model
{
    /** @use HasFactory<\Database\Factories\HabilidadeFactory> */
    use HasFactory;

    protected $table = 'habilidades';

    protected $fillable = [
        'descricao',
    ];

    protected $hidden = [
        'password',
    ];

    protected $primaryKey = 'id';

    public function voluntarios()
    {
        return $this->belongsToMany(Voluntario::class, 'voluntario_habilidade', 'id_habilidade', 'id_voluntario');
    }
    
    public function projetos()
    {
        return $this->belongsToMany(Projeto::class, 'projeto_habilidade', 'id_habilidade', 'id_projeto');
    }
}
