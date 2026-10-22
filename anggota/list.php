<?php
$page_title = "Daftar Anggota";

require __DIR__ . '/../includes/koneksi.php';
include __DIR__ . '/../includes/header.php';

$flash = $_SESSION['flash'] ?? null;
unset($_SESSION['flash']);

$daftarAnggota = $pdo->query("SELECT * FROM anggota ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
?>

<section>

    <h2>Daftar Anggota</h2>

    <?php if ($flash): ?>
        <p class="flash flash-<?php echo htmlspecialchars($flash['type']); ?>">
            <?php echo htmlspecialchars($flash['pesan']); ?>
        </p>
    <?php endif; ?>

    <div class="search-box">
        <label for="search-input">Cari Anggota</label>
        <input type="text" id="search-input" placeholder="Ketik nama anggota...">
    </div>

    <div class="table-responsive">
        <table>
            <thead>
                <tr>
                    <th>Nama</th>
                    <th>No. Anggota</th>
                    <th>Email</th>
                    <th>Alamat</th>
                    <th>No. HP</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($daftarAnggota)): ?>
                    <tr>
                        <td colspan="6">
                            Belum ada data anggota. Silakan tambah lewat menu "Tambah Anggota".
                        </td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($daftarAnggota as $anggota): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($anggota['nama'] ?? ''); ?></td>
                            <td><?php echo htmlspecialchars($anggota['no_anggota'] ?? ''); ?></td>
                            <td><?php echo htmlspecialchars($anggota['email'] ?? ''); ?></td>
                            <td><?php echo htmlspecialchars($anggota['alamat'] ?? ''); ?></td>
                            <td><?php echo htmlspecialchars($anggota['no_hp'] ?? ''); ?></td>
                            <td>
                                <button type="button" class="btn-edit">Edit</button>
                                <form action="proses_hapus.php" method="post" class="form-hapus">
                                    <input type="hidden" name="id" value="<?php echo $anggota['id']; ?>">
                                    <button type="submit" class="btn-hapus" data-nama="<?php echo htmlspecialchars($anggota['nama'] ?? 'anggota ini'); ?>">
                                        Hapus
                                    </button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>

</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>