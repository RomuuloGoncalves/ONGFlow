<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VoluntarioHabilidade extends Model
{
    protected $table = 'voluntario_habilidade';
    public $timestamps = false;

    protected $fillable = [
        'id_voluntario',
        'id_habilidade'
    ];
}
