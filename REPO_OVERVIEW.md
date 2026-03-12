# Ringkasan Repo `harryjuliano/home`

Repo ini adalah **starter kit Laravel 12 + React + Inertia** yang menyiapkan fondasi autentikasi, otorisasi RBAC, UI reusable, i18n, dan utilitas umum untuk dipakai lintas proyek.

## Arsitektur

- **Backend:** Laravel 12 (PHP 8.2), Inertia Laravel, Sanctum.
- **Frontend:** React 18 + Inertia React + Vite + Tailwind CSS.
- **Authorization:** `spatie/laravel-permission` untuk role & permission.
- **Routing frontend-backend:** Ziggy (`route()` di React).

## Fitur Utama

1. **Auth siap pakai (Breeze)**
   - Login, register, lupa/reset password, verifikasi email.

2. **RBAC admin**
   - CRUD untuk User, Role, Permission.
   - Assign role ke user.
   - Assign permission ke role.

3. **Shared props Inertia**
   - User login + daftar role + permission dibagikan global.
   - Locale app, daftar locale tersedia, dan flash messages.
   - Terjemahan JSON (`lang/en.json`, `lang/id.json`) dikirim ke frontend.

4. **Fondasi UI reusable**
   - Layout guest/authenticated.
   - Komponen reusable (`DataTable`, modal, button, input, dsb).

5. **Global app settings di frontend**
   - Penyimpanan bahasa (`en`/`id`) dan tema (`light`/`dark`) via localStorage.
   - Helper terjemahan `t(key)`.

## Alur Data RBAC Singkat

- Backend mengelola role/permission (Spatie).
- Middleware Inertia membagikan `auth.roles` dan `auth.permissions`.
- Frontend membaca data ini via hook `useAuthorization` untuk cek `can(permission)` dan `hasRole(role)`.

## Endpoint Penting

- `/dashboard` (auth + email verified).
- `/profile` (edit profil).
- `/users`, `/roles`, `/permissions` (halaman admin manajemen RBAC).
- Route auth standar berada di `routes/auth.php`.

## Seed Default

Seeder `SuperAdminSeeder` membuat role `super-admin` dan user default:
- Email: `admin@julianoo.work`
- Password: `1122334455`

> Catatan: kredensial ini aman untuk local/dev, tetapi **harus diganti** untuk environment selain development.
