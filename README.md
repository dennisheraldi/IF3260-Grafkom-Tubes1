# IF3260-Grafkom-Tubes1
2D Web Based CAD (Computer-Aided Design) developed with HTML, CSS, and JavaScript using WebGL 

## Deskripsi 
Aplikasi 2D Web Based CAD (Computer Aided Design) merupakan aplikasi web yang memungkinkan pengguna untuk mendesain gambar dua dimensi mulai dari garis hingga bidang segi banyak (poligon). Aplikasi ini dibangun menggunakan bahasa pemrograman JavaScript dengan bantuan library WebGL sebagai pemroses grafis agar pengguna dapat menggambar, mengedit, dan memvisualisasikan sejumlah model di atas elemen HTML5 canvas. Adapun fitur/fungsionalitas yang dipenuhi oleh aplikasi ini adalah sebagai berikut. <br>
* Dapat melakukan fungsi menggambar model beserta metode spesialnya: <br>
1. Menggambar model garis dan mengubah panjangnya <br>
2. Menggambar model persegi dan mengubah panjang sisinya <br>
3. Menggambar model persegi panjang dan mengubah ukuran panjang atau lebarnya <br>
4. Menggambar model poligon dan memodifikasi titik sudut poligon (menambah dan menghapus titik sudut) <br>
* Untuk setiap model, dapat dilakukan aksi: <br> 
1. Melakukan transformasi geometri translasi dan rotasi <br>
2. Menggerakkan titik sudut dengan cara drag and drop <br>
3. Mengubah warna salah satu atau semua titik sudut <br>
4. Menyimpan dan memuat model yang telah dibuat <br>
* Terdapat fitur lanjutan convex hull pada penggambaran model poligon untuk memastikan model poligon yang terbentuk menjadi konveks 

## Cara Menjalankan Program
1. Clone repository ini
2. Ekstrak dan akses direktori `src` hasil ekstraksi dari repository ini 
3. Jalankan `index.html` dan secara otomatis akan membuka browser default untuk menjalankan file `.html`
4. Jika WebGL tersedia pada browser, maka canvas akan muncul dan dapat langsung menggambar
