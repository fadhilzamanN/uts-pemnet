<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservasiController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function(){
    return Inertia::render("Home");
});

Route::get("/reservasi-ruang", [ReservasiController::class, "index"])->name("reservasi");
Route::post("/reservasi-ruang/create", [ReservasiController::class, "store"]);
Route::patch("/reservasi-ruang/update/{id}", [ReservasiController::class, "update"]);
Route::delete("/reservasi-ruang/delete/{id}", [ReservasiController::class, "delete"]);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
