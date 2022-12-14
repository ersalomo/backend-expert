# Kriteria Forum API

  Terdapat 6 kriteria utama yang harus Anda penuhi dalam membuat proyek Forum API.

## Kriteria 1: Menambahkan Thread

  API harus dapat menambahkan thread melalui route:

  -Method: POST
  -Path: /threads
  -Body Request:

```{}
{
    "title": string,
    "body": string
}
```

- Response yang harus dikembalikan:
- Status Code: 201
- Response Body:

```{}
{
    "status": "success",
    "data": {
        "addedThread": {
            "id": "thread-h_W1Plfpj0TY7wyT2PUPX",
            "title": "sebuah thread",
            "owner": "user-DWrT3pXe1hccYkV1eIAxS"
        }
    }
}
```

Ketentuan:

Menambahkan thread merupakan resource yang dibatasi (restrict). Untuk mengaksesnya membutuhkan access token guna mengetahui siapa yang membuat thread.
Jika properti body request tidak lengkap atau tidak sesuai, maka:
Kembalikan dengan status code 400; serta
Berikan body response:
-status: “fail”
-message: Pesan apapun selama tidak kosong.

## Kriteria 2: Menambahkan Komentar pada Thread

API harus dapat menambahkan komentar pada thread melalui route:
-Method: POST
-Path: /threads/{threadId}/comments
Body Request:

```{}
{
    "content": string
}
```

Response yang harus dikembalikan:

-Status Code: 201
Response Body:

```{}
{
    "status": "success",
    "data": {
        "addedComment": {
            "id": "comment-_pby2_tmXV6bcvcdev8xk",
            "content": "sebuah comment",
            "owner": "user-CrkY5iAgOdMqv36bIvys2"
        }
    }
}
```

Ketentuan:

Menambahkan komentar pada thread merupakan resource yang dibatasi (restrict). Untuk mengaksesnya membutuhkan access token guna mengetahui siapa yang membuat komentar.
Jika thread yang diberi komentar tidak ada atau tidak valid, maka:
Kembalikan dengan status code 404; serta
Berikan body response:
-status: “fail”
-message: Pesan apapun selama tidak kosong.
Jika properti body request tidak lengkap atau tidak sesuai, maka:
Kembalikan dengan status code 400; serta
Berikan body response:
-status: “fail”
-message: Pesan apapun selama tidak kosong.

## Kriteria 3: Menghapus Komentar pada Thread

API harus dapat menghapus komentar pada thread melalui route:
-Method: DELETE
-Path: /threads/{threadId}/comments/{commentId}

Response yang harus dikembalikan:

-Status Code: 200
Response Body:

```{}
{
    "status": "success"
}
```

Ketentuan:

Menghapus komentar pada thread merupakan resource yang dibatasi (restrict). Untuk mengaksesnya membutuhkan access token guna mengetahui siapa yang menghapus komentar.
Hanya pemilik komentar yang dapat menghapus komentar. Bila bukan pemilik komentar, maka:
Kembalikan dengan status code 403; serta
Berikan body response:
-status: “fail”
-message: Pesan apapun selama tidak kosong.
Jika thread atau komentar yang hendak dihapus tidak ada atau tidak valid, maka:
Kembalikan dengan status code 404; serta
Berikan body response:
-status: “fail”
-message: Pesan apapun selama tidak kosong.
Komentar dihapus secara soft delete, alias tidak benar-benar dihapus dari database. Anda bisa membuat dan memanfaatkan kolom seperti is_delete sebagai indikator apakah komentar dihapus atau tidak.

## Kriteria 4: Melihat Detail Thread

API harus dapat melihat detail thread melalui route:
-Method: GET
-Path: /threads/{threadId}
Response yang harus dikembalikan:
-Status Code: 200
-Response Body:

```{}
{
    "status": "success",
    "data": {
        "thread": {
            "id": "thread-h_2FkLZhtgBKY2kh4CC02",
            "title": "sebuah thread",
            "body": "sebuah body thread",
            "date": "2021-08-08T07:19:09.775Z",
            "username": "dicoding",
            "comments": [
                {
                    "id": "comment-_pby2_tmXV6bcvcdev8xk",
                    "username": "johndoe",
                    "date": "2021-08-08T07:22:33.555Z",
                    "content": "sebuah comment"
                },
                {
                    "id": "comment-yksuCoxM2s4MMrZJO-qVD",
                    "username": "dicoding",
                    "date": "2021-08-08T07:26:21.338Z",
                    "content": "**komentar telah dihapus**"
                }
            ]
        }
    }
}
```

Ketentuan:
Mendapatkan detail thread merupakan resource terbuka. Sehingga tidak perlu melampirkan access token.
Jika thread yang diakses tidak ada atau tidak valid, maka:
Kembalikan dengan status code 404; serta
Berikan body response:
-status: “fail”
-message: Pesan apapun selama tidak kosong.
Wajib menampilkan seluruh komentar yang terdapat pada thread tersebut sesuai dengan contoh di atas.
Komentar yang dihapus ditampilkan dengan konten **komentar telah dihapus**.
Komentar diurutkan secara ascending (dari kecil ke besar) berdasarkan waktu berkomentar.

## Kriteria 5: Menerapkan Automation Testing

Proyek Forum API wajib menerapkan automation testing dengan kriteria berikut:

-Unit Testing:
Wajib menerapkan Unit Testing pada bisnis logika yang ada. Baik di Entities ataupun di Use Case.
-Integration Test:
Wajib menerapkan Integration Test dalam menguji interaksi database dengan Repository.

## Kriteria 6: Menerapkan Clean Architecture

Proyek Forum API wajib menerapkan Clean Architecture. Di mana source code terdiri dari 4 layer yaitu:

-Entities (jika dibutuhkan)
Tempat penyimpanan data entitas bisnis utama. Jika suatu bisnis butuh mengelola struktur data yang kompleks, maka buatlah entities.
-Use Case:
Di gunakan sebagai tempat menuliskannya flow atau alur bisnis logika.
Interface Adapter (Repository dan Handler)
Mediator atau penghubung antara layer framework dengan layer use case.
Frameworks (Database dan HTTP server)
Level paling luar merupakan bagian yang berhubungan dengan framework.
