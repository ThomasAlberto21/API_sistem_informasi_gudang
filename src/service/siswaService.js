import { validation } from '../validation/validation.js';
import { randomNumber } from '../helpers/randomNumber.js';
import { prismaClient } from '../app/database.js';
import { ResponseError } from '../error/responseError.js';
import {
  createSiswaValidation,
  getSiswaValidation,
  updateSiswaValidation,
} from '../validation/siswaValidation.js';

const getSiswaService = async () => {
  return prismaClient.siswa.findMany({
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
      kelas: {
        select: {
          id_kelas: true,
          nama_kelas: true,
        },
      },
      alamat: true,
      foto_siswa: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

const searchSiswaService = async (request) => {
  const { nama_siswa, no_anggota } = request;
  let whereCondition = {};

  if (nama_siswa) {
    whereCondition = {
      ...whereCondition,
      nama_siswa: {
        contains: nama_siswa,
        mode: 'insensitive',
      },
    };
  }

  if (no_anggota) {
    const noAnggotaInt = parseInt(no_anggota);
    whereCondition = {
      ...whereCondition,
      no_anggota: {
        equals: noAnggotaInt,
      },
    };
  }

  const siswa = await prismaClient.siswa.findFirst({
    where: whereCondition,
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
      kelas: {
        select: {
          id_kelas: true,
          nama_kelas: true,
        },
      },
      alamat: true,
      foto_siswa: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!siswa) {
    throw new ResponseError(404, 'Siswa tidak ditemukan');
  }

  return siswa;
};

const createSiswaService = async (request) => {
  const siswa = await validation(createSiswaValidation, request);
  const siswaExist = await prismaClient.siswa.count({
    where: {
      nama_siswa: siswa.nama_siswa,
    },
  });

  if (siswaExist === 1) {
    throw new ResponseError(409, 'Siswa sudah ada');
  }

  siswa.no_anggota = randomNumber();

  return prismaClient.siswa.create({
    data: siswa,
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
      kelas: {
        select: {
          id_kelas: true,
          nama_kelas: true,
        },
      },
      alamat: true,
      foto_siswa: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const getSiswaByIdService = async (siswaId) => {
  siswaId = await validation(getSiswaValidation, siswaId);
  const siswa = await prismaClient.siswa.findUnique({
    where: {
      id_siswa: siswaId,
    },
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
      kelas: {
        select: {
          id_kelas: true,
          nama_kelas: true,
        },
      },
      alamat: true,
      foto_siswa: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!siswa) {
    throw new ResponseError(404, 'Siswa tidak ditemukan');
  }

  return siswa;
};

const updateSiswaService = async (request) => {
  const siswa = await validation(updateSiswaValidation, request);
  const siswaExist = await prismaClient.siswa.count({
    where: {
      id_siswa: siswa.id_siswa,
    },
  });

  if (siswaExist !== 1) {
    throw new ResponseError(404, 'Siswa tidak ditemukan');
  }

  return prismaClient.siswa.update({
    where: {
      id_siswa: siswa.id_siswa,
    },
    data: siswa,
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
      kelas: {
        select: {
          id_kelas: true,
          nama_kelas: true,
        },
      },
      alamat: true,
      foto_siswa: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const deleteSiswaService = async (siswaId) => {
  siswaId = await validation(getSiswaValidation, siswaId);
  const siswaExist = await prismaClient.siswa.count({
    where: {
      id_siswa: siswaId,
    },
  });

  if (siswaExist !== 1) {
    throw new ResponseError(404, 'Siswa tidak ditemukan');
  }

  return prismaClient.siswa.delete({
    where: {
      id_siswa: siswaId,
    },
  });
};

export default {
  getSiswaService,
  createSiswaService,
  searchSiswaService,
  getSiswaByIdService,
  updateSiswaService,
  deleteSiswaService,
};
