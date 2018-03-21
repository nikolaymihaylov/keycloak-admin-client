'use strict';

const privates = require('./private-map');
const createError = require('./errors');
const request = require('request');

/**
 * @module users
 */

module.exports = {
  find: find,
  add: add,
  remove: remove
};

/**
  Returns a list of user's groups, filtered according to query parameters

  @param {string} realmName - The name of the realm(not the realmID) - ex: master
  @param {string} userId - Id of the users
  @returns {Promise} A promise that will resolve with an Array of user's group objects
  @example
  keycloakAdminClient(settings)
    .then((client) => {
      client.users.groups.find(realmName, userId)
        .then((groups) => {
          console.log(groups) // [{...},{...}, ...]
        })
      });
 */
function find (client) {
  return function find (realm, userId) {
    return new Promise((resolve, reject) => {
      const req = {
        auth: {
          bearer: privates.get(client).accessToken
        },
        json: true,
        url: `${client.baseUrl}/admin/realms/${realm}/users/${userId}/groups`
      };

      request(req, (err, resp, body) => {
        if (err) {
          return reject(err);
        }

        if (resp.statusCode !== 200) {
          return reject(createError(resp.statusCode, body));
        }

        return resolve(body);
      });
    });
  };
}

/**
  Adds a user to a group.

  @param {string} realmName - The name of the realm(not the realmID) - ex: master
  @param {string} userId - Id of the user
  @param {string} groupId - Id of the group
  @returns {Promise} A promise that resolves.
  @example
  keycloakAdminClient(settings)
    .then((client) => {
      client.users.groups.add(realmName, userId, groupId)
        .then(() => {
          console.log('success')
        })
      });
 */
function add (client) {
  return function add (realm, userId, groupId) {
    return new Promise((resolve, reject) => {
      const req = {
        auth: {
          bearer: privates.get(client).accessToken
        },
        json: true,
        method: 'PUT',
        url: `${client.baseUrl}/admin/realms/${realm}/users/${userId}/groups/${groupId}`
      };

      request(req, (err, resp, body) => {
        if (err) {
          return reject(err);
        }

        if (resp.statusCode !== 204) {
          return reject(body);
        }

        return resolve(body);
      });
    });
  };
}

/**
  Removes a user from a group.

  @param {string} realmName - The name of the realm(not the realmID) - ex: master
  @param {string} userId - Id of the user
  @param {string} groupId - Id of the group
  @returns {Promise} A promise that resolves.
  @example
  keycloakAdminClient(settings)
    .then((client) => {
      client.users.groups.remove(realmName, userId, groupId)
        .then(() => {
          console.log('success')
        })
      });
 */
function remove (client) {
  return function remove (realm, userId, groupId) {
    return new Promise((resolve, reject) => {
      const req = {
        auth: {
          bearer: privates.get(client).accessToken
        },
        json: true,
        method: 'DELETE',
        url: `${client.baseUrl}/admin/realms/${realm}/users/${userId}/groups/${groupId}`
      };

      request(req, (err, resp, body) => {
        if (err) {
          return reject(err);
        }

        if (resp.statusCode !== 204) {
          return reject(body);
        }

        return resolve(body);
      });
    });
  };
}
