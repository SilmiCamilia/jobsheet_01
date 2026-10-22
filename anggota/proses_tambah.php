<?php
session_start();
require __DIR__ . '/../includes/koneksi.php';

$nama       = trim($_POST['nama'] ?? '');
$no_anggota = trim($_POST['no_anggota'] ?? '');
$email      = trim($_POST['email'] ?? '');
$alamat     = trim($_POST['alamat'] ?? '');
$no_hp      = trim($_POST['no_hp'] ?? '');

$errors = [];

if ($nama === '') {
    $errors[] = "Nama wajib diisi.";
}

if ($no_anggota === '') {
    $errors[] = "No. Anggota wajib diisi.";
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Format email tidak valid.";
}

if ($no_hp !== '' && !preg_match('/^[0-9]+$/', $no_hp)) {
    $errors[] = "No. HP hanya boleh berisi angka.";
}

if (!empty($errors)) {
    $_SESSION['flash'] = [
        'type' => 'error',
        'pesan' => implode(' ', $errors)
    ];
    header('Location: tambah.php');
    exit;
}

try {
    $stmt = $pdo->prepare(
        "INSERT INTO anggota (nama, no_anggota, alamat, no_hp)
         VALUES (:nama, :no_anggota, :alamat, :no_hp)
         RETURNING id"
    );

    $stmt->execute([
        'nama'       => $nama,
        'no_anggota' => $no_anggota,
        'alamat'     => $alamat,
        'no_hp'      => $no_hp
    ]);

    $_SESSION['flash'] = [
        'type' => 'success',
        'pesan' => 'Anggota berhasil ditambahkan.'
    ];

    header('Location: list.php');
    exit;

} catch (PDOException $e) {
    if ($e->getCode() === '23505') {
        $pesanError = "No. Anggota sudah dipakai, gunakan nomor lain.";
    } else {
        $pesanError = "Gagal menyimpan data: " . $e->getMessage();
    }

    $_SESSION['flash'] = [
        'type' => 'error',
        'pesan' => $pesanError
    ];

    header('Location: tambah.php');
    exit;
}