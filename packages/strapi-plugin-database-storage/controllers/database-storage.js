'use strict';

/**
 * database-storage.js controller
 *
 * @description: A set of functions called "actions" of the `database-storage` plugin.
 */

module.exports = {
  get: async (ctx) => {
    const {id} = ctx.params;
    /** @type{(import('knex').Knex)} */
    const knex = strapi.connections.default;
    const result = await knex('strapi_documents_store')
      .select('content', 'mime')
      .where('hash', id);
    if (result.length !== 1) {
      return ctx.notFound();
    }
    ctx.res
      .writeHead(200, {
        'Content-Length': Buffer.byteLength(result[0].content),
        'Content-Type': result[0].mime,
      })
      .end(result[0].content);
  }
};
