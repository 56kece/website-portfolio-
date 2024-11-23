document.addEventListener("DOMContentLoaded", () => {
    const contactBtn = document.getElementById("contact-btn");
    const downloadBtn = document.getElementById("download-btn");

  let text = "selamat melihat CV badrun nafis......";
  let index = 0;
  let speed = 150;  // Kecepatan mengetik

  function typeWriter() {
    if (index < text.length) {
      document.getElementById("cv-title").innerHTML += text.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    } else {
      // Setelah selesai, reset dan mulai lagi
      setTimeout(() => {
        index = 0;  // Reset indeks
        document.getElementById("cv-title").innerHTML = '';  // Kosongkan teks
        typeWriter();  // Mulai lagi
      }, 1000);  // Delay sebelum mulai ulang (1 detik)
    }
  }

  window.onload = typeWriter;
  

  document.getElementById("download-btn").addEventListener("click", function() {
    Swal.fire({
      title: 'Download Dimulai',
      text: 'CV Anda sedang diunduh...',
      icon: 'success',
      background: '#111',
      color: '#00aaff',
      showConfirmButton: false,
      timer: 2000
    });
    // Logika untuk mengunduh CV
  });

    // Tombol Contact: Membuka WhatsApp
    contactBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const phoneNumber = "+6282172660413"; // Ganti dengan nomor WhatsApp Anda
      Swal.fire({
        title: "Hubungi Saya",
        text: "Klik OK untuk membuka WhatsApp.",
        icon: "info",
        background: '#111',
        color: '#00aaff',
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.open(`https://wa.me/${phoneNumber}`, "_blank");
        }
      });
    });
  
    // Tombol Download: Mengunduh CV dari body
    downloadBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const cvContainer = document.getElementById("cv-container");
  
      const options = {
        margin: 1,
        filename: "cv_Badrun.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
  
      html2pdf().set(options).from(cvContainer).save();
    });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const saranButton = document.getElementById("saran-btn");
    const modal = document.getElementById("saran-modal");
    const form = document.getElementById("saran-form");
    const saranInput = document.getElementById("saran");
    const saranContainer = document.getElementById("saran-cards-container");
    const closeModalButton = document.getElementById("close-modal");
  
    // Fungsi untuk menyimpan saran ke Local Storage
    function saveSaranToLocalStorage(saran) {
      const saranList = JSON.parse(localStorage.getItem("saranList")) || [];
      saranList.push(saran);
      localStorage.setItem("saranList", JSON.stringify(saranList));
    }
  
    // Fungsi untuk memuat saran dari Local Storage
    function loadSaranFromLocalStorage() {
      const saranList = JSON.parse(localStorage.getItem("saranList")) || [];
      saranList.forEach((saran) => {
        const card = document.createElement("div");
        card.className = "card bg-dark text-light mb-3";
        card.innerHTML = `
          <div class="card-body">
            <p class="card-text">${saran}</p>
          </div>
        `;
        saranContainer.appendChild(card);
      });
    }
  
    // Panggil fungsi untuk memuat saran saat halaman dimuat
    loadSaranFromLocalStorage();
  
    // Fungsi untuk membuka modal
    saranButton.addEventListener("click", () => {
      modal.classList.remove("d-none");
    });
  
    // Fungsi untuk menutup modal
    closeModalButton.addEventListener("click", () => {
      modal.classList.add("d-none");
    });
  
    // Fungsi untuk submit form
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const saranValue = saranInput.value.trim();
      if (!saranValue) {
        alert("Saran tidak boleh kosong!");
        return;
      }
  
      // Buat card untuk menampilkan saran
      const card = document.createElement("div");
      card.className = "card bg-dark text-light mb-3";
      card.innerHTML = `
        <div class="card-body">
          <p class="card-text">${saranValue}</p>
        </div>
      `;
      saranContainer.appendChild(card);
  
      // Simpan saran ke Local Storage
      saveSaranToLocalStorage(saranValue);
  
      // Reset input dan tutup modal
      saranInput.value = "";
      modal.classList.add("d-none");
    });
  });
  
