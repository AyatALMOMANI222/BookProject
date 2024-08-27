<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\Cart;
use App\Models\BookCart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller;

class BookCartController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function addBookToCart(Request $request)
    {
        // التحقق من صحة البيانات
        $validated = $request->validate([
            'book_id' => 'required|exists:book,id',
        ]);

        // الحصول على المستخدم الحالي من التوكن
        $user = Auth::user();

        // العثور على سلة المشتريات للمستخدم الحالي
        $cart = Cart::where('user_id', $user->id)->first();

        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }

        // التحقق مما إذا كان الكتاب موجودًا بالفعل في سلة المشتريات باستخدام جدول book_cart
        $existingBookCart = BookCart::where('book_id', $validated['book_id'])
                                    ->where('cart_id', $cart->id)
                                    ->exists();

        if ($existingBookCart) {
            return response()->json(['message' => 'Book already in cart'], 200);
        }

        // إضافة الكتاب إلى سلة المشتريات
        BookCart::create([
            'book_id' => $validated['book_id'],
            'cart_id' => $cart->id,
        ]);

        return response()->json(['message' => 'Book added to cart successfully!'], 201);
    }


    public function deleteBookFromCart(Request $request)
    {
        // التحقق من صحة البيانات
        $validated = $request->validate([
            'book_id' => 'required|exists:book,id',
        ]);

        // الحصول على المستخدم الحالي من التوكن
        $user = Auth::user();

        // العثور على سلة المشتريات للمستخدم الحالي
        $cart = Cart::where('user_id', $user->id)->first();

        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }

        // العثور على الكتاب في سلة المشتريات
        $bookCart = BookCart::where('book_id', $validated['book_id'])
                            ->where('cart_id', $cart->id)
                            ->first();

        if (!$bookCart) {
            return response()->json(['message' => 'Book not found in cart'], 404);
        }

        // حذف الكتاب من سلة المشتريات
        $bookCart->delete();

        return response()->json(['message' => 'Book removed from cart successfully!'], 200);
    }
}
