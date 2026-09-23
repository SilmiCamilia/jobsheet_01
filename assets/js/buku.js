async function muatDaftarBuku() {
    const tbody = document.querySelector("#tabel-buku tbody");
    const loading = document.getElementById("loading");
    const counter = document.getElementById("counter-buku");

    if (!tbody) return;

    loading.style.display = "block";
    tbody.innerHTML = "";

    try {
        const res = await fetch("../data/buku.json");

        if (!res.ok) {
            throw new Error(
                "Gagal mengambil data (status " + res.status + ")"
            );
        }

        const daftarBuku = await res.json();

        daftarBuku.forEach(function (buku) {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${buku.judul}</td>
                <td>${buku.pengarang}</td>
                <td>${buku.tahun}</td>
                <td>${buku.stok}</td>
                <td>
                    <button type="button" class="btn-hapus">
                        Hapus
                    </button>
                </td>
            `;

            tbody.appendChild(tr);
        });

        if (counter) {
            counter.textContent =
                "Menampilkan " +
                daftarBuku.length +
                " dari " +
                daftarBuku.length +
                " buku";
        }

    } catch (err) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5">
                    Gagal memuat dataa: ${err.message}
                </td>
            </tr>
        `;

    } finally {
        loading.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    muatDaftarBuku();
});