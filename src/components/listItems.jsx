import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';
import CollectionIcon from '@mui/icons-material/Collections';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <Link className="link" to="/">
                <ListItemText primary="Home" />
            </Link>
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <Link className="link" to="/create">
                <ListItemText primary="Create Comic" />
            </Link>
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Saved
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <CollectionIcon />
            </ListItemIcon>
            <Link className="link" to="/mycomics">
                <ListItemText primary="My Comics" />
            </Link>
        </ListItemButton>
    </React.Fragment>
);