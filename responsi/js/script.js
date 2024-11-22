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
        filename: "My_CV.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
  
      html2pdf().set(options).from(cvContainer).save();
    });
  });
  