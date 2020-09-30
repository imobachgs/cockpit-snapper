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
import { Select, SelectOption, SelectVariant } from '@patternfly/react-core';

class ConfigurationSelector extends React.Component {
    constructor(props) {
        super(props);

        this.options = this.props.configs.map(c => (
            { value: c.name, description: c.subvolume, disabled: false }
        ));

        const { onChange } = props;

        this.state = {
            isOpen: false,
            selected: props.selected || null,
            isDisabled: false
        };

        this.handleOnToggle = isOpen => {
            this.setState({
                isOpen
            });
        };

        this.handleOnSelect = (event, selection, isPlaceholder) => {
            if (isPlaceholder) this.clearSelection();
            else {
                this.setState({
                    selected: selection,
                    isOpen: false
                });
                if (onChange) onChange(selection);
            }
        };

        this.clearSelection = () => {
            this.setState({
                selected: null,
                isOpen: false
            });
        };
    }

    render() {
        const { isOpen, selected, isDisabled } = this.state;
        const titleId = 'select-descriptions-title';
        return (
            <div>
                <span id={titleId} hidden>
                    Snapshots
                </span>
                <Select
                  variant={SelectVariant.single}
                  placeholderText="Select a configuration"
                  aria-label="Select Input with descriptions"
                  onToggle={this.handleOnToggle}
                  onSelect={this.handleOnSelect}
                  selections={selected}
                  isOpen={isOpen}
                  aria-labelledby={titleId}
                  isDisabled={isDisabled}
                >
                    {this.options.map((option, index) => (
                        <SelectOption
                          isDisabled={option.disabled}
                          key={index}
                          value={option.value}
                          isPlaceholder={option.isPlaceholder}
                          description={option.description}
                        />
                    ))}
                </Select>
            </div>
        );
    }
}

export default ConfigurationSelector;
