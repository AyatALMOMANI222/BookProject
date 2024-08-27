<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookCart extends Model
{
    use HasFactory;
    protected $table = 'book_cart';
    protected $fillable = ['book_id', 'cart_id'];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }
}
