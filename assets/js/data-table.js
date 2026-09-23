async function muatDataTabel(
    url,
    tbodySelector,
    loadingSelector,
    kolom,
    colspan
) {
    const tbody = document.querySelector(tbodySelector);
    const loading = document.querySelector(loadingSelector);

    if (!tbody) return;

    if (loading) {
        loading.style.display = "block";
    }

    tbody.innerHTML = "";

    try {
        const res = await fetch(url);
        await new Promise(function (resolve) {
        setTimeout(resolve, 3000);
        });
        if (!res.ok) {
            throw new Error(
                "Gagal mengambil dataa (status " + res.status + ")"
            );
        }

        const data = await res.json();

        data.forEach(function (item) {

            const tr = document.createElement("tr");

            let html = "";

            kolom.forEach(function (key) {
                html += `<td>${item[key]}</td>`;
            });

            html += `
                <td>
                    <button
                        type="button"
                        class="btn-hapus">
                        Hapus
                    </button>
                </td>
            `;

            tr.innerHTML = html;

            tbody.appendChild(tr);
        });

    } catch (err) {

        tbody.innerHTML = `
            <tr>
                <td colspan="${colspan}">
                    Gagal memuat data: ${err.message}
                </td>
            </tr>
        `;

    } finally {

        if (loading) {
            loading.style.display = "none";
        }
    }
}