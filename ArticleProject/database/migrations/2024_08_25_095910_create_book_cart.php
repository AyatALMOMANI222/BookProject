<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('book_cart', function (Blueprint $table) {

            $table->id(); // عمود id الأساسي
            $table->unsignedBigInteger('cart_id'); // عمود cart_id
            $table->unsignedBigInteger('book_id'); // عمود book_id
            $table->integer('quantity')->default(1); // عمود quantity مع القيمة الافتراضية 1
            $table->timestamps(); // أعمدة timestamps

            // تحديد المفاتيح الأجنبية
            $table->foreign('cart_id')->references('id')->on('cart')->onDelete('cascade');
            $table->foreign('book_id')->references('id')->on('book')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_cart');
    }
};
