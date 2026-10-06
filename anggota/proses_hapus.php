<?php

session_start();

$index = $_POST['index'] ?? null;

if (
    $index !== null &&
    isset($_SESSION['anggota'][$index])
) {

    unset($_SESSION['anggota'][$index]);

    $_SESSION['anggota'] = array_values($_SESSION['anggota']);

    $_SESSION['flash'] = [
        'type' => 'success',
        'pesan' => 'Anggota berhasil dihapus.'
    ];

} else {

    $_SESSION['flash'] = [
        'type' => 'error',
        'pesan' => 'Data anggota tidak ditemukan.'
    ];
}

header('Location: list.php');
exit;