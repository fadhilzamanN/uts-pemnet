<?php

namespace App\Http\Controllers;

use App\Models\Reservasi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservasiController extends Controller
{
    public function index(){
        $allReservasi = Reservasi::all();
        return Inertia::render("ReservasiDashboard", [
            "listReservasi" => $allReservasi
        ]);
    }

    public function update(Request $request, $id){
        $reservasi = Reservasi::find($id);
        $reservasi->ruang = $request->ruangan;
        $reservasi->pembooking = $request->pembooking;
        $reservasi->pukul = $request->waktu;
        $reservasi->update();
        return redirect()->route("reservasi");
    }

    public function store(Request $request){
        $reservasi = new Reservasi();
        $reservasi->ruang = $request->ruangan;
        $reservasi->pembooking = $request->pembooking;
        $reservasi->pukul = $request->waktu;
        $reservasi->save();
        return redirect()->route("reservasi");
    }

    public function delete($id){
        $reservasi = Reservasi::find($id);
        $reservasi->delete();
        return redirect()->route("reservasi");
    }
}
