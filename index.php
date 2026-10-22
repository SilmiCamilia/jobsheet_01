<?php
$page_title = "Beranda";

require __DIR__ . '/includes/koneksi.php';
include __DIR__ . '/includes/header.php';

$totalBuku    = $pdo->query("SELECT COUNT(*) FROM buku")->fetchColumn();
$totalAnggota = $pdo->query("SELECT COUNT(*) FROM anggota")->fetchColumn();
?>

<section>
    <h2>Dashboard SIMPUS-Mini</h2>
    
    <div class="summary-cards">
        <article>
            <h3>Total Buku</h3>
            <p><?php echo $totalBuku; ?></p>
        </article>
        
        <article>
            <h3>Total Anggota</h3>
            <p><?php echo $totalAnggota; ?></p>
        </article>
    </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>