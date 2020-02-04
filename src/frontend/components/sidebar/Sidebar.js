import React, { Fragment } from 'react';
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

const parseCategories = (examples) => {
  const categories = {}
  const root = {}

  Object.entries(examples).forEach(([key, e]) => {
    const cat = e.doc.category
    if (cat) {
      if (categories[cat]) {
        categories[cat][key] = e
      } else {
        categories[cat] = {[key]: e}
      }
    }
    else {
      root[key] = e
    }
  })

  const result = Object.entries(categories).reduce((acc, [key, val]) => {
      acc[key] = val
      return acc
    }, 
    {
      'Functions': Object.entries(root).reduce((acc, [key, val]) => val.type === 'function' ? (acc[key] = val) && acc : acc, {}),
      'Classes': Object.entries(root).reduce((acc, [key, val]) => val.type === 'class' ? (acc[key] = val) && acc : acc, {}),
      'Objects': Object.entries(root).reduce((acc, [key, val]) => val.type === 'object' ? (acc[key] = val) && acc : acc, {})
    }
  )

  Object.entries(result).forEach(([key, val]) => {
    if (Object.values(val).length === 0) {
      delete result[key]
    }
  })



  return result

}

const icons = {
  'function': <FunctionsIcon />,
  'object': <CodeIcon />,
  'class': <ClassIcon />
}

const drawerWidth = 300

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

  const categories = parseCategories(examples)

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}>
      <div className={classes.toolbar} />

      {Object.entries(categories).map(([key, val]) => (
        <Fragment
          key={key}>
          <List>
            <Typography variant='h6' paragraph>
              {key}
            </Typography>
            {Object.entries(val).map(([name, value]) =>
              value.type === 'class' ? 
                <SidebarClass 
                  key={name}
                  parentName={name}
                  properties={value.properties}
                  selected={selected}
                  setSelected={setSelected}/>              
              :
                <ListItem 
                  button 
                  key={name} 
                  selected={selected === name} 
                  onClick={() => setSelected(name)}>
                  <ListItemIcon>{icons[value.type] || <FunctionsIcon />}</ListItemIcon>
                  <ListItemText primary={name} />
                </ListItem>
            )}
          </List>
          <Divider />
        </Fragment>
      ))}
    </Drawer>
  );
}

export default Sidebar