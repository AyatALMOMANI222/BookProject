<?php
namespace App\Http\Controllers;

use App\Models\BookCart;
use Illuminate\Http\Request;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller;

class CartController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum'); // تأكد من حماية الدالة بتوكن المصادقة
    }

    public function getCartByUserId()
    {
        // الحصول على المستخدم الحالي من التوكن
        $user = Auth::user();

        // العثور على سلة التسوق الخاصة بالمستخدم
        $cart = Cart::where('user_id', $user->id)->first();

        // التحقق مما إذا كانت السلة موجودة
        if ($cart) {
            return response()->json(['cart' => $cart], 200);
        }

        return response()->json(['message' => 'Cart not found'], 404);
    }


    public function getBooksFromCart(Request $request)
    {
        // الحصول على التوكن من الطلب والتحقق منه للحصول على user_id
        $user = $request->user(); // الحصول على المستخدم من التوكن
        
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $userId = $user->id;

        // العثور على cart_id بناءً على user_id
        $cart = Cart::where('user_id', $userId)->first();

        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }

        // العثور على الكتب المرتبطة بـ cart_id
        $bookCartEntries = BookCart::where('cart_id', $cart->id)->get();

        // الحصول على تفاصيل الكتب
        $books = $bookCartEntries->map(function ($bookCartEntry) {
            return $bookCartEntry->book;
        });

        return response()->json($books);
    }

}
