import React, { Fragment, useState } from 'react';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import ClassIcon from '@material-ui/icons/Class'
import FunctionsIcon from '@material-ui/icons/Functions'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const SidebarClass = ( { parentName, properties, selected, setSelected } ) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  return (
    <Fragment>
      <ListItem 
        button 
        key={parentName} 
        selected={selected === parentName} 
        onClick={() => (setOpen(!open) || setSelected(parentName))}>
        <ListItemIcon><ClassIcon /></ListItemIcon>
        <ListItemText primary={parentName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {Object.entries(properties).map(([name, value]) => (
            <ListItem 
              button 
              key={name} 
              selected={selected === parentName + '.' + name} 
              className={classes.nested}
              onClick={() => setSelected(parentName + '.' + name)}>
              <ListItemIcon><FunctionsIcon /></ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
          </List>
      </Collapse>
    </Fragment>
  );
}

export default SidebarClass