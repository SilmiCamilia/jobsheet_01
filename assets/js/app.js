function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");

    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
    });
}


function initHapusConfirm() {
    document.querySelectorAll(".btn-hapus").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const row = btn.closest("tr");

            const nama = row
                ? row.querySelector("td")?.textContent
                : "data ini";

            const yakin = confirm(
                "Apakah kamu yakin ingin menghapus " + nama + "?"
            );

            if (yakin && row) {
                row.remove();
            }
        });
    });
}


function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector("table");
    const counter = document.getElementById("counter-buku");

    if (!input || !table) return;

    input.addEventListener("keyup", function () {

        const keyword = input.value.toLowerCase();

        const rows = table.querySelectorAll("tbody tr");

        let tampil = 0;
        const total = rows.length;

        rows.forEach(function (row) {

            const judul = row
                .querySelector("td:first-child")
                ?.textContent
                .toLowerCase() || "";

            if (judul.includes(keyword)) {
                row.style.display = "";
                tampil++;
            } else {
                row.style.display = "none";
            }

        });

        if (counter) {
            counter.textContent =
                "Menampilkan " +
                tampil +
                " dari " +
                total +
                " buku";
        }
    });
}


function hapusError(input) {
    const next = input.nextElementSibling;

    if (next && next.classList.contains("error")) {
        next.remove();
    }
}


function tampilkanError(input, pesan) {
    hapusError(input);

    const span = document.createElement("span");

    span.className = "error";
    span.textContent = pesan;

    input.insertAdjacentElement("afterend", span);
}
function initDynamicHapus() {
    document.addEventListener("click", function (e) {

        const btn = e.target.closest(".btn-hapus");

        if (!btn) return;

        const row = btn.closest("tr");

        const nama = row
            ? row.querySelector("td")?.textContent
            : "data ini";

        const yakin = confirm(
            "Apakah kamu yakin ingin menghapus " + nama + "?"
        );

        if (yakin && row) {
            row.remove();
        }
    });
}

function initValidasiForm() {
    const form = document.getElementById("form-tambah");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        let valid = true;

        const judul = form.querySelector(
            "[name='judul'], [name='nama']"
        );

        if (judul && judul.value.trim() === "") {
            tampilkanError(
                judul,
                "Field ini wajib diisi."
            );

            valid = false;
        }

        const tahun = form.querySelector("[name='tahun']");

        if (tahun) {
            const nilaiTahun = parseInt(tahun.value);

            if (
                tahun.value.trim() === "" ||
                isNaN(nilaiTahun)
            ) {
                tampilkanError(
                    tahun,
                    "Tahun wajib diisi dengan angka."
                );

                valid = false;
            }
        }

        const stok = form.querySelector("[name='stok']");

        if (stok) {
            const nilaiStok = parseInt(stok.value);

            if (
                stok.value.trim() === "" ||
                isNaN(nilaiStok) ||
                nilaiStok < 0
            ) {
                tampilkanError(
                    stok,
                    "Stok haruss berupa angka dan tidak boleh kurang dari 0."
                );

                valid = false;
            }
        }

        const isbn = form.querySelector("[name='isbn']");

        if (isbn && isbn.value.trim() !== "") {
            const polaISBN = /^[0-9-]+$/;

            if (!polaISBN.test(isbn.value)) {
                tampilkanError(
                    isbn,
                    "ISBN hanya boleh berisi angka dan tanda hubung."
                );

                valid = false;
            }
        }

        if (!valid) {
            e.preventDefault();
        }
    });
}


document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHapusConfirm();
    initDynamicHapus();
    initTableFilter();
    initValidasiForm();
});