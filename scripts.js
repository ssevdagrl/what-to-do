/* Takvim bölümü başlangıcı */

// Bugünün tarihini al
let today = new Date();
// Geçerli ayı al
let currentMonth = today.getMonth();
// Geçerli yılı al
let currentYear = today.getFullYear();
// Yıl seçici öğesini al
let selectYear = document.getElementById("year");
// Ay seçici öğesini al
let selectMonth = document.getElementById("month");

// Ayların listesi
let months = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

// Ay ve yıl bilgisini gösteren öğeyi al
let monthAndYear = document.getElementById("monthAndYear");
// Takvimi göster
showCalendar(currentMonth, currentYear);

// Sonraki ay fonksiyonu
function next() {
    // Eğer geçerli ay Aralık ise, bir sonraki yıla geç, aksi takdirde yılı aynı tut
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    // Ayı bir sonraki ay olarak ayarla
    currentMonth = (currentMonth + 1) % 12;
    // Takvimi göster
    showCalendar(currentMonth, currentYear);
}

// Önceki ay fonksiyonu
function previous() {
    // Eğer geçerli ay Ocak ise, bir önceki yıla geç, aksi takdirde yılı aynı tut
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    // Eğer geçerli ay Ocak ise, bir önceki ay Aralık olarak ayarla, aksi takdirde bir önceki ayı al
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    // Takvimi göster
    showCalendar(currentMonth, currentYear);
}

// Atlanacak ayı ayarla fonksiyonu
function jump() {
    // Seçilen yılı al
    currentYear = parseInt(selectYear.value);
    // Seçilen ayı al
    currentMonth = parseInt(selectMonth.value);
    // Takvimi göster
    showCalendar(currentMonth, currentYear);
}

// Takvimi göster fonksiyonu
function showCalendar(month, year) {

    // İlk günü al
    let firstDay = (new Date(year, month)).getDay();
    // Aydaki gün sayısını al
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    // Takvimin gövdesini al
    let tbl = document.getElementById("calendar-body");

    // Önceki hücreleri temizle
    tbl.innerHTML = "";

    // Sayfa üzerinde ay ve yıl bilgisini doldur
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // Tüm hücreleri oluştur
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // Bir satır oluştur
        let row = document.createElement("tr");

        // Her bir hücreyi oluştur, verilerle doldur
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // Bugünün tarihini renklendir
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // Her satırı takvim gövdesine ekle
    }

}

/* Takvim bölümü sonu */

// Arama formunu ve gezinme menüsünü al
const searchForm = document.querySelector(".search-form");
const navbar = document.querySelector(".navbar");

/* Butonlar */

// Arama butonunu al
const searchBtn = document.querySelector("#search-btn");
// Menü butonunu al
const menuBtn = document.querySelector("#menu-btn");

// Arama butonuna tıklama olayı ekle
searchBtn.addEventListener("click", function () {
    // Arama formunun aktif durumunu değiştir
    searchForm.classList.toggle("active");
    // Belge üzerinde tıklama olayını ekle
    document.addEventListener("click", function (e) {
        if (
            !e.composedPath().includes(searchBtn) && !e.composedPath().includes(searchForm)
        ) {
            searchForm.classList.remove("active");
        }
    })
});

// Menü butonuna tıklama olayı ekle
menuBtn.addEventListener("click", function () {
    // Gezinme menüsünün aktif durumunu değiştir
    navbar.classList.toggle("active");
    // Belge üzerinde tıklama olayını ekle
    document.addEventListener("click", function (e) {
        if (
            !e.composedPath().includes(menuBtn) && !e.composedPath().includes(navbar)
        ) {
            navbar.classList.remove("active");
        }
    })
});
