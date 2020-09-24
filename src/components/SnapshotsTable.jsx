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

import React from 'react';
import { Table, TableHeader, TableBody, TableVariant } from '@patternfly/react-table';
import cockpit from 'cockpit';
const _ = cockpit.gettext;

const SnapshotsTable = ({ snapshots }) => {
    const columns = [
        _("Number"), _("Type"), _("Pre"), _("Date"), _("User"),
        _("Clean-up"), _("Description")
    ];
    const rows = snapshots.map(s =>
        [
            s.number,
            s.type,
            s.pre_number,
            s.date,
            s.user,
            s.cleanup,
            s.description,
        ]
    );

    return (
        <Table
          aria-label="Snapshots List"
          variant={TableVariant.compact}
          rows={rows}
          cells={columns}
        >
            <TableHeader />
            <TableBody />
        </Table>
    );
};

export default SnapshotsTable;
