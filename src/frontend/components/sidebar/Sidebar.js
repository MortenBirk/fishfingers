import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import FunctionsIcon from '@material-ui/icons/Functions'
import CodeIcon from '@material-ui/icons/Code'
import ClassIcon from '@material-ui/icons/Class'
import SidebarClass from './SidebarClass'

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
  
  const functionExamples = Object.entries(examples).reduce((acc, [key, val]) => val.type === 'function' ? (acc[key] = val) && acc : acc, {})
  const classExamples = Object.entries(examples).reduce((acc, [key, val]) => val.type === 'class' ? (acc[key] = val) && acc : acc, {})
  const objectExamples = Object.entries(examples).reduce((acc, [key, val]) => val.type === 'object' ? (acc[key] = val) && acc : acc, {})
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}>
      <div className={classes.toolbar} />

      <List>
        <Typography  variant='h6' paragraph>
          Functions
        </Typography>
        {Object.entries(functionExamples).map(([name, value]) => (
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
      <Divider />

      <List>
        <Typography  variant='h6' paragraph>
          Classes
        </Typography>
        {Object.entries(classExamples).map(([name, value]) => (
          <SidebarClass 
            key={name}
            parentName={name}
            properties={value.properties}
            selected={selected}
            setSelected={setSelected}/>
          ))}
      </List>
      <Divider />

      <List>
        <Typography  variant='h6' paragraph>
          Objects
        </Typography>
        {Object.entries(objectExamples).map(([name, value]) => (
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