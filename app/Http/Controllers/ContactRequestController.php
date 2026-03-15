<?php

namespace App\Http\Controllers;

use App\Models\ContactRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactRequestController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'whatsapp_number' => ['required', 'string', 'max:30'],
            'company_name' => ['nullable', 'string', 'max:255'],
            'request_type' => ['required', 'in:request_demo,general_question,partnership_offer,system_consultation'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        ContactRequest::create($validated);

        Mail::raw($this->buildEmailBody($validated), function ($mail) use ($validated) {
            $mail->to('harrywira97@gmail.com')
                ->replyTo($validated['email'], $validated['name'])
                ->subject('[Website] '.$validated['subject']);
        });

        return back()->with('success', 'Terima kasih, permintaan Anda sudah kami terima. Tim kami akan segera menghubungi Anda.');
    }

    private function buildEmailBody(array $data): string
    {
        $requestTypeLabel = match ($data['request_type']) {
            'request_demo' => 'Request demo',
            'general_question' => 'Pertanyaan umum',
            'partnership_offer' => 'Penawaran kerja sama',
            'system_consultation' => 'Konsultasi kebutuhan sistem',
        };

        return "Permintaan baru dari website:\n\n"
            ."Nama: {$data['name']}\n"
            ."Email: {$data['email']}\n"
            ."No WhatsApp: {$data['whatsapp_number']}\n"
            ."Nama Perusahaan: ".($data['company_name'] ?: '-') ."\n"
            ."Jenis Permintaan: {$requestTypeLabel}\n"
            ."Subjek: {$data['subject']}\n\n"
            ."Pesan:\n{$data['message']}\n";
    }
}
