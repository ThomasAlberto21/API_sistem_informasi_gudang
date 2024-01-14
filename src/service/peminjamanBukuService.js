import { validation } from '../validation/validation.js';
import { prismaClient } from '../app/database.js';
import { ResponseError } from '../error/responseError.js';
import {
  createPeminjamanBukuValidation,
  getPeminjamanBukuValidation,
} from '../validation/peminjamanBukuValidation.js';

const getPeminjamanBukuService = async () => {
  return prismaClient.peminjaman.findMany({
    select: {
      id_peminjaman: true,
      buku: {
        select: {
          id_buku: true,
          judul_buku: true,
          pengarang: true,
          penerbit: true,
          tahun_terbit: true,
          deskripsi: true,
          stok_buku: true,
          foto_buku: true,
          rak_buku: {
            select: {
              id_rak_buku: true,
              nama_rak_buku: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      },
      siswa: {
        select: {
          id_siswa: true,
          no_anggota: true,
          nama_siswa: true,
          nis: true,
          nisn: true,
          tanggal_lahir: true,
          tempat_lahir: true,
          jenis_kelamin: true,
          agama: {
            select: {
              id_agama: true,
              nama_agama: true,
            },
          },
          alamat: true,
          kelas: {
            select: {
              id_kelas: true,
              nama_kelas: true,
            },
          },
          foto_siswa: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      denda: {
        select: {
          id_denda: true,
          nominal: true,
        },
      },
      status: true,
      tanggal_pinjam: true,
      tanggal_kembali: true,
      keterlambatan: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const createPeminjamanBukuService = async (request) => {
  const peminjamanBuku = await validation(
    createPeminjamanBukuValidation,
    request,
  );
  const stokBukuExist = await prismaClient.buku.findUnique({
    where: {
      id_buku: peminjamanBuku.id_buku,
    },
    select: {
      stok_buku: true,
    },
  });

  const peminjamanBukuExist = await prismaClient.peminjaman.count({
    where: {
      id_buku: peminjamanBuku.id_buku,
      id_siswa: peminjamanBuku.id_siswa,
    },
  });

  const siswaExist = await prismaClient.siswa.count({
    where: {
      id_siswa: peminjamanBuku.id_siswa,
    },
  });

  // DENDA , TANGGAL PINJAM , TANGGAL KEMBALI
  const tanggalPinjam = new Date();
  const tanggalKembali = new Date(tanggalPinjam);
  tanggalKembali.setDate(tanggalKembali.getDate() + 7);

  let status = 'Pinjam';

  const dataPeminjamanBuku = {
    ...peminjamanBuku,
    tanggal_pinjam: tanggalPinjam,
    tanggal_kembali: tanggalKembali,
    status: status,
    keterlambatan: new Date(),
  };

  if (peminjamanBukuExist === 1) {
    throw new ResponseError(409, 'Siswa Sudah Meminjam Buku Ini');
  }

  if (siswaExist !== 1) {
    throw new ResponseError(404, 'Siswa Tidak Ditemukan');
  }

  if (stokBukuExist.stok_buku === 0) {
    throw new ResponseError(409, 'Stok Buku Habis');
  }

  const peminjaman = prismaClient.peminjaman.create({
    data: dataPeminjamanBuku,
    select: {
      id_peminjaman: true,
      buku: {
        select: {
          id_buku: true,
          judul_buku: true,
          pengarang: true,
          penerbit: true,
          tahun_terbit: true,
          deskripsi: true,
          stok_buku: true,
          foto_buku: true,
          rak_buku: {
            select: {
              id_rak_buku: true,
              nama_rak_buku: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      },
      siswa: {
        select: {
          id_siswa: true,
          no_anggota: true,
          nama_siswa: true,
          nis: true,
          nisn: true,
          tanggal_lahir: true,
          tempat_lahir: true,
          jenis_kelamin: true,
          agama: {
            select: {
              id_agama: true,
              nama_agama: true,
            },
          },
          alamat: true,
          kelas: {
            select: {
              id_kelas: true,
              nama_kelas: true,
            },
          },
          foto_siswa: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      denda: {
        select: {
          id_denda: true,
          nominal: true,
        },
      },
      status: true,
      tanggal_pinjam: true,
      tanggal_kembali: true,
      keterlambatan: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (peminjaman) {
    await prismaClient.buku.update({
      where: {
        id_buku: peminjamanBuku.id_buku,
      },
      data: {
        stok_buku: {
          decrement: 1,
        },
      },
    });
  }

  return peminjaman;
};

const searchPeminjamanBukuService = async (request) => {
  const { no_anggota } = request;
  const noAnggotaInt = parseInt(no_anggota);
  const peminjaman = await prismaClient.peminjaman.findFirst({
    where: {
      siswa: {
        no_anggota: {
          equals: noAnggotaInt,
        },
      },
    },
    select: {
      id_peminjaman: true,
      buku: {
        select: {
          id_buku: true,
          judul_buku: true,
          pengarang: true,
          penerbit: true,
          tahun_terbit: true,
          deskripsi: true,
          stok_buku: true,
          foto_buku: true,
          rak_buku: {
            select: {
              id_rak_buku: true,
              nama_rak_buku: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      },
      siswa: {
        select: {
          id_siswa: true,
          no_anggota: true,
          nama_siswa: true,
          nis: true,
          nisn: true,
          tanggal_lahir: true,
          tempat_lahir: true,
          jenis_kelamin: true,
          agama: {
            select: {
              id_agama: true,
              nama_agama: true,
            },
          },
          alamat: true,
          kelas: {
            select: {
              id_kelas: true,
              nama_kelas: true,
            },
          },
          foto_siswa: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      denda: {
        select: {
          id_denda: true,
          nominal: true,
        },
      },
      status: true,
      tanggal_pinjam: true,
      tanggal_kembali: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!peminjaman) {
    throw new ResponseError(404, 'Peminjaman Tidak Ditemukan');
  }

  return peminjaman;
};

const deletePeminjamanBukuService = async (peminjamanBukuId) => {
  peminjamanBukuId = await validation(
    getPeminjamanBukuValidation,
    peminjamanBukuId,
  );
  const peminjaman = await prismaClient.peminjaman.findUnique({
    where: {
      id_peminjaman: peminjamanBukuId,
    },
  });

  if (!peminjaman) {
    throw new ResponseError(404, 'Peminjaman Tidak Ditemukan');
  }

  const deletedPeminjaman = await prismaClient.peminjaman.delete({
    where: {
      id_peminjaman: peminjamanBukuId,
    },
  });

  if (deletedPeminjaman) {
    // Tambahkan informasi peminjaman ke dalam tabel riwayat
    let status = 'Peminjaman Selesai';

    await prismaClient.riwayat.create({
      data: {
        id_siswa: peminjaman.id_siswa,
        id_buku: peminjaman.id_buku,
        tanggal_pinjam: peminjaman.tanggal_pinjam,
        tanggal_kembali: peminjaman.tanggal_kembali,
        status: status,
      },
    });

    // Update stok buku setelah peminjaman dihapus
    await prismaClient.buku.update({
      where: {
        id_buku: deletedPeminjaman.id_buku,
      },
      data: {
        stok_buku: {
          increment: 1,
        },
      },
    });
  }

  return deletedPeminjaman;
};

const updatePeminjamanBukuService = async () => {
  const currentDate = new Date().toISOString();

  // Mencari data peminjaman yang statusnya masih pinjam dan tanggal kembali lebih kecil dari tanggal saat ini
  const peminjamanList = await prismaClient.peminjaman.findMany({
    where: {
      status: 'Pinjam',
      tanggal_kembali: {
        lt: currentDate,
      },
    },
  });

  return peminjamanList.map(async (peminjaman) => {
    // Menentukan nilai keterlambatan berdasarkan kondisi
    let keterlambatan =
      currentDate >= peminjaman.tanggal_kembali
        ? currentDate
        : peminjaman.keterlambatan;

    // Menghitung selisih waktu antara tanggal kembali dan tanggal saat ini
    const selisihWaktu =
      new Date(currentDate) - new Date(peminjaman.tanggal_kembali);

    // Jika lewat dari 1 hari, maka update keterlambatan menjadi tanggal saat ini
    if (selisihWaktu > 24 * 60 * 60 * 1000) {
      keterlambatan = currentDate;
    }

    // Menentukan status berdasarkan kondisi keterlambatan
    const status =
      keterlambatan >= peminjaman.tanggal_kembali ? 'Terlambat' : 'Pinjam';

    // Jika status terlambat, maka tambahkan data denda
    let idDenda = null;
    if (status === 'Terlambat') {
      const denda = await prismaClient.denda.create({
        data: {
          nominal: denda?.nominal,
        },
      });

      idDenda = denda?.id_denda;
    }

    return prismaClient.peminjaman.updateMany({
      data: {
        status: status,
        keterlambatan: keterlambatan,
        id_denda: idDenda,
      },
    });
  });
};

export default {
  getPeminjamanBukuService,
  createPeminjamanBukuService,
  searchPeminjamanBukuService,
  updatePeminjamanBukuService,
  deletePeminjamanBukuService,
};
