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

import React, { useState, useEffect } from 'react';
import SnapshotsTable from './SnapshotsTable.jsx';
import ConfigurationSelector from './ConfigurationSelector.jsx';
import {
    Card,
    PageSection,
    Text,
    TextContent,
    ToolbarContent,
    Toolbar,
    ToolbarItem,
    PageSectionVariants
} from '@patternfly/react-core';
import snapper from '../lib/snapper.js';
import cockpit from 'cockpit';

const _ = cockpit.gettext;

const SnapshotsPage = (props) => {
    const { configs } = props;
    const initialConfig = (configs.length === 0) ? null : configs[0].config;
    const [selectedConfig, setConfig] = useState(initialConfig);
    const [snapshots, setSnapshots] = useState([]);

    useEffect(() => {
        if (selectedConfig) {
            snapper.listSnapshots(selectedConfig).then(setSnapshots);
        }
    }, [selectedConfig]);

    if (!configs) {
        return (<div>No data yet!</div>);
    }

    return (
        <PageSection variant={PageSectionVariants.light}>
            <Card isCompact>
                <TextContent>
                    <Text component="h2">{_("Snapshots")}</Text>
                </TextContent>
                <Toolbar>
                    <ToolbarContent>
                        <ToolbarItem>
                            <ConfigurationSelector
                              configs={configs}
                              onChange={setConfig}
                              selected={selectedConfig}
                            />
                        </ToolbarItem>
                    </ToolbarContent>
                </Toolbar>
                <SnapshotsTable snapshots={snapshots} />
            </Card>
        </PageSection>
    );
};

export default SnapshotsPage;
