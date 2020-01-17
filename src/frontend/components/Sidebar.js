import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import FunctionsIcon from '@material-ui/icons/Functions';
import CodeIcon from '@material-ui/icons/Code';
import ClassIcon from '@material-ui/icons/Class';

const icons = {
  'function': <FunctionsIcon />,
  'object': <CodeIcon />,
  'class': <ClassIcon />
}

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}));

const Sidebar = ( { examples, selected, setSelected } ) => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}>
      <div className={classes.toolbar} />
      <List>
        {Object.entries(examples).map(([name, value]) => (
          <ListItem 
            button 
            key={name} 
            selected={selected === name} 
            onClick={() => setSelected(name)}>
            <ListItemIcon>{icons[value.type] || <FunctionsIcon />}</ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar