function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");

    if (!toggleBtn || !nav) {
        return;
    }

    toggleBtn.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
    });
}


function initHapusConfirm() {
    document.querySelectorAll(".form-hapus").forEach(function (form) {

        form.addEventListener("submit", function (e) {

            const button = form.querySelector(".btn-hapus");

            const nama = button
                ? button.dataset.nama || "data ini"
                : "data ini";

            const yakin = confirm(
                "Apakah kamu yakin ingin menghapus " + nama + "?"
            );

            if (!yakin) {
                e.preventDefault();
            }

        });

    });
}


function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector("table");

    if (!input || !table) {
        return;
    }

    input.addEventListener("input", function () {

        const keyword = input.value.toLowerCase();

        const rows = table.querySelectorAll("tbody tr");

        rows.forEach(function (row) {

            const cells = row.querySelectorAll("td");

            if (cells.length === 0) {
                return;
            }

            const teks = cells[0].textContent.toLowerCase();

            if (teks.includes(keyword)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

        });

    });
}


function hapusError(input) {

    const next = input.nextElementSibling;

    if (
        next &&
        next.classList.contains("error")
    ) {
        next.remove();
    }
}


function tampilkanError(input, pesan) {

    hapusError(input);

    const span = document.createElement("span");

    span.className = "error";
    span.textContent = pesan;

    input.insertAdjacentElement(
        "afterend",
        span
    );
}


function initValidasiForm() {

    const form = document.getElementById("form-tambah");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function (e) {

        let valid = true;

        const namaAtauJudul = form.querySelector(
            "[name='judul'], [name='nama']"
        );

        if (
            namaAtauJudul &&
            namaAtauJudul.value.trim() === ""
        ) {

            tampilkanError(
                namaAtauJudul,
                "Field ini wajib diisi."
            );

            valid = false;
        }


        const tahun = form.querySelector("[name='tahun']");

        if (tahun) {

            const nilaiTahun = parseInt(tahun.value);

            if (
                tahun.value.trim() === "" ||
                isNaN(nilaiTahun) ||
                nilaiTahun < 1900 ||
                nilaiTahun > 2026
            ) {

                tampilkanError(
                    tahun,
                    "Tahun harus di antara 1900-2026."
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
                    "Stok harus berupa angka dan tidak boleh kurang dari 0."
                );

                valid = false;
            }
        }


        const isbn = form.querySelector("[name='isbn']");

        if (
            isbn &&
            isbn.value.trim() !== ""
        ) {

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


document.addEventListener(
    "DOMContentLoaded",
    function () {

        initNavToggle();
        initHapusConfirm();
        initTableFilter();
        initValidasiForm();

    }
);