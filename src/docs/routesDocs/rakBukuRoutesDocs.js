// ======= GET RAK BUKU =======
/**
 * @openapi
 * /api/rak-buku:
 *  get:
 *    tags:
 *      - Rak Buku
 *    summary: Get Rak Buku
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Get Rak Buku Success'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Get Rak Buku Unauthorized'
 *
 * */

// ======= SEARCH RAK BUKU =======
/**
 * @openapi
 * /api/rak-buku/search:
 *  get:
 *    tags:
 *      - Rak Buku
 *    summary: Search Rak Buku
 *    parameters:
 *      - name: nama_rak_buku
 *        in: query
 *        required: true
 *        description: search rak buku
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Search Rak Buku Success'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Search Rak Buku Unauthorized'
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Search Rak Buku Not Found'
 *
 * */

// ======= CREATE RAK BUKU =======
/**
 * @openapi
 * /api/rak-buku:
 *  post:
 *    tags:
 *      - Rak Buku
 *    summary: Create Rak Buku
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Add Rak Buku'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Add Rak Buku Success'
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Add Rak Buku Bad Request'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Add Rak Buku Unauthorized'
 *      409:
 *        description: Conflict
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Add Rak Buku Conflict'
 *
 * */

// ======= GET RAK BUKU BY ID =======
/**
 * @openapi
 * /api/rak-buku/{rakBukuId}:
 *  get:
 *    tags:
 *      - Rak Buku
 *    summary: Get Rak Buku By ID
 *    parameters:
 *      - name: rakBukuId
 *        in: path
 *        required: true
 *        description: Rak Buku ID
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Get Rak Buku By ID Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Get Rak Buku By ID Success'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Get Rak Buku By ID Unauthorized'
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Get Rak Buku By ID Not Found'
 *
 * */


// ======= UPDATE RAK BUKU =======
/**
 * @openapi
 * /api/rak-buku/{rakBukuId}:
 *  put:
 *    tags:
 *      - Rak Buku
 *    summary: Update Rak Buku
 *    parameters:
 *      - name: rakBukuId
 *        in: path
 *        required: true
 *        description: Rak Buku ID
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Update Rak Buku'
 *    responses:
 *      200:
 *        description: Update Rak Buku Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Update Rak Buku Success'
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Update Rak Buku Bad Request'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Update Rak Buku Unauthorized'
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Update Rak Buku Not Found'
 *      409:
 *        description: Conflict
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Update Rak Buku Conflict'
 *
 * */

// ======= DELETE RAK BUKU =======
/**
 * @openapi
 * /api/rak-buku/{rakBukuId}:
 *  delete:
 *    tags:
 *      - Rak Buku
 *    summary: Delete Rak Buku
 *    parameters:
 *      - name: rakBukuId
 *        in: path
 *        required: true
 *        description: Rak Buku ID
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Delete Rak Buku Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Delete Rak Buku Success'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Delete Rak Buku Unauthorized'
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Delete Rak Buku Not Found'
 *
 * */