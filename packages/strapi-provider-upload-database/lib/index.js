'use strict';

/**
 * Module dependencies
 */

const tableName = 'strapi_documents_store'

module.exports = {
  init(config) {
    const absoluteUrl = config.absoluteUrl !== undefined ? !!config.absoluteUrl : true;
    return {
      /**
       *
       * @param {{
       *   name: string,
       *   alternativeText: string,
       *   buffer: Buffer,
       *   mime: string,
       *   size: number,
       *   ext: string,
       *   url: string,
       *   provider_metadata: any
       * }} file
       * @param customParams
       * @return {Promise<unknown>}
       */
      upload(file, customParams = {}) {
        return new Promise(async (resolve, reject) => {
          /** @type{(import('knex').Knex)} */
          const knex = strapi.connections.default;
          try {
            const {hash, ext, buffer: content, mime} = file;
            await knex(tableName)
              .insert({
                hash,
                content,
                mime
              });
            file.url = [absoluteUrl ? strapi.config.server.url : '', 'database-storage', hash + ext];
            resolve();
          } catch (e) {
            console.error(e.message);
            reject();
          }
        });
      },
      delete(file, customParams = {}) {
        return new Promise((resolve, reject) => {
          /** @type{(import('knex').Knex)} */
          const knex = strapi.connections.default;
          try {
            knex(tableName)
              .where('hash', file.hash)
              .delete();
            resolve();
          } catch (e) {
            console.error(e.message);
            reject();
          }
        });
      },
    };
  },
};
