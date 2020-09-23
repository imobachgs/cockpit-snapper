/**
 * Copyright (c) [2020] SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

import cockpit from 'cockpit';

/**
 * Returns the list of available configurations
 *
 * TOOD: replace with the real implementation.
 *
 * @returns {Promise<Array|Error>} Resolves to an array of object in case of success
 */
const listConfigs = () => {
    return new Promise((resolve, reject) => {
        cockpit.spawn(["snapper", "--jsonout", "list-configs"], { superuser: true })
                .then(result => {
                    const parsed_result = JSON.parse(result);
                    resolve(parsed_result.configs);
                })
                .catch(reject);
    });
};

const buildSnapshot = (data) => {
    const {
        subvolume,
        number,
        active,
        type,
        user,
        cleanup,
        description,
        userdata
    } = data;

    return {
        subvolume,
        number,
        active,
        type,
        user,
        cleanup,
        description,
        userdata,
        is_default:  data.default,
        pre_number:  data["pre-number"],
        used_space:  data["used-space"],
    };
};

/**
 * Returns the list of snapshots for a given configuration
 *
 * @param {string} config_name Configuration name
 * @returns {Promise<Array|Error>} Resolves to an array of objects in case of success
 */
const listSnapshots = (config_name) => {
    return new Promise((resolve, reject) => {
        cockpit.spawn(["snapper", "--jsonout", "list"], { superuser: true })
                .then(result => {
                    const parsed_result = JSON.parse(result);
                    const snapshots = parsed_result[config_name].map(buildSnapshot);
                    resolve(snapshots);
                })
                .catch(reject);
    });
};

export default {
    listConfigs,
    listSnapshots
};
