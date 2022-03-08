<?php

namespace App;

use App\Traits\HasJWT;
use App\Contracts\Uploader;
use App\Traits\UploadsFiles;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * @property integer $id
 */
class User extends Authenticatable implements JWTSubject, Uploader
{
    use Notifiable, SoftDeletes, HasJWT, UploadsFiles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes used for uploads.
     *
     * @var array
     */
    protected $uploadAttributes = [
        'directory',
        'filename',
        'original_filename',
        'filesize',
        'thumbnail_filesize',
        'url',
        'thumbnail_url'
    ];

    /**
     * Get the directory for uploads.
     *
     * @return string
     */
    public function getDirectory() : string
    {
        return 'uploads/users/'.$this->getKey();
    }

    /**
     * Get the upload attributes
     *
     * @return array
     */
    public function getUploadAttributes() : array
    {
        return $this->uploadAttributes;
    }

    public function layouts()
    {
        return $this->hasMany('App\Models\Wallet\Layout');
    }

    public function clients()
    {
        return $this->morphToMany('App\Client', 'company', 'company_clients');
    }
    public function settings()
    {
        return $this->hasMany('App\Models\UserSetting');
    }
}
