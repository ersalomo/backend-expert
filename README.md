# Kriteria Forum API SUBMSISION 2

  Terdapat 4 kriteria yang harus Anda penuhi dalam mengembangkan proyek Forum API kali ini.

## Kriteria 1: Menerapkan Continuous Integration

## Kriteria 2: Menerapkan Continuous Deployment

## Kriteria 3: Menerapkan Limit Access

## Kriteria 4: Menggunakan Protokol HTTPS

## Kriteria 5: Kriteria Opsional Forum API

## Fitur Menyukai dan Batal Menyukai Komentar

    API harus dapat menyukai/batal menyukai komentar thread melalui route:
    - Method: PUT
    - Path: /threads/{threadId}/comments/{commentId}/likes

    Response yang dikembalikan:
    - Status code: 200
    - Response body:
    ```{
         "status": "success"
    }```
