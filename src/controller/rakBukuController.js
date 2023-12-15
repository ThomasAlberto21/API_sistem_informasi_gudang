import rakBukuService from '../service/rakBukuService.js';

const getRakBukuController = async (req, res, next) => {
  try {
    const result = await rakBukuService.getRakBukuService();
    res.status(200).json({
      status: 'Success',
      message: 'Berhasil mendapatkan data Rak Buku',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const searchRakBukuController = async (req, res, next) => {
  try {
    const request = req.query;
    const result = await rakBukuService.searchRakBukuService(request);
    res.status(200).json({
      status: 'Success',
      message: 'Berhasil mencari data Rak Buku',
      data: result,
    });
  } catch (error) {
    next(error);
  }

};

const createRakBukuController = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await rakBukuService.createRakBukuService(request);
    res.status(200).json({
      status: 'Success',
      message: 'Berhasil Menambahkan Data Rak Buku',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getRakBukuByIdController = async (req, res, next) => {
  try {
    const { rakBukuId } = req.params;
    const result = await rakBukuService.getRakBukuByIdService(rakBukuId);
    res.status(200).json({
      status: 'Success',
      message: 'Berhasil mendapatkan data Rak Buku',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateRakBukuController = async (req, res, next) => {
  try {
    const { rakBukuId } = req.params;
    const request = req.body;
    request.id_rak_buku = rakBukuId;
    const result = await rakBukuService.updateRakBukuService(request);
    res.status(200).json({
      status: 'Success',
      message: 'Berhasil mengubah data Rak Buku',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRakBukuController = async (req, res, next) => {
  try {
    const { rakBukuId } = req.params;
    await rakBukuService.deleteRakBukuService(rakBukuId);
    res.status(200).json({
      status: 'Success',
      message: 'Berhasil menghapus data Rak Buku',
    });
  } catch (error) {
    next(error);
  }
};


export default {
  searchRakBukuController,
  getRakBukuController,
  createRakBukuController,
  getRakBukuByIdController,
  updateRakBukuController,
  deleteRakBukuController,
};