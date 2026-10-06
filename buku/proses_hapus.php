<?php

session_start();

$index = $_POST['index'] ?? null;

if (
    $index !== null &&
    isset($_SESSION['buku'][$index])
) {

    unset($_SESSION['buku'][$index]);

    $_SESSION['buku'] = array_values($_SESSION['buku']);

    $_SESSION['flash'] = [
        'type' => 'success',
        'pesan' => 'Buku berhasil dihapus.'
    ];

} else {

    $_SESSION['flash'] = [
        'type' => 'error',
        'pesan' => 'Data buku tidak ditemukan.'
    ];
}

header('Location: list.php');
exit;