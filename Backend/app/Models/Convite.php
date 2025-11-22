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
        'status',
        'mensagem',
        'data_criacao',
        'data_resposta',
        'id_ong',
        'id_voluntario',
        'id_projeto',
    ];

    protected $hidden = [
    ];

    protected $casts = [
        'data_criacao' => 'date',
        'data_resposta' => 'date',
    ];

    protected $primaryKey = 'id';

    public function ong()
    {
        return $this->belongsTo(Ong::class, 'id_ong');
    }

    public function voluntario()
    {
        return $this->belongsTo(Voluntario::class, 'id_voluntario');
    }

    public function projeto()
    {
        return $this->belongsTo(Projeto::class, 'id_projeto');
    }

}
