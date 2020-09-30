/*
 * Copyright (c) [2020] SUSE LLC
 *
 * All Rights Reserved.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of version 2 of the GNU General Public License as published
 * by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, contact SUSE LLC.
 *
 * To contact SUSE LLC about this file by physical or electronic mail, you may
 * find current contact information at www.suse.com.
 */

import cockpit from 'cockpit';

const buildConfig = (data) => {
    const [name, subvolume] = data;
    return { name, subvolume };
};

/**
 * Returns the list of available configurations
 *
 * @returns {Promise<Array|Error>} Resolves to an array of object in case of success
 */
const listConfigs = () => {
    return new Promise((resolve, reject) => {
        const client = cockpit.dbus("org.opensuse.Snapper");
        client.call("/org/opensuse/Snapper", "org.opensuse.Snapper", "ListConfigs")
                .then(result => resolve(result[0].map(buildConfig)))
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
        const client = cockpit.dbus("org.opensuse.Snapper");
        client.call("/org/opensuse/Snapper", "org.opensuse.Snapper", "ListSnapshots", [config_name])
                .then(result => resolve(result[0].map(buildSnapshot)))
                .catch(reject);
    });
};

export default {
    listConfigs,
    listSnapshots
};
