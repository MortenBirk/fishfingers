import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Sidebar from './sidebar/Sidebar'
import Example from './example/Example'
import examples from '../../../doc/parsedJson'
import config from 'fishfingers/config'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

const App = () => {
  const [selected, setSelected] = useState(Object.keys(examples)[0])
  const classes = useStyles();

  const selectedExample = () => {
    const selects = selected.split('.')
    let res = examples[selects.shift()]
    while (selects.length > 0) {
      res = res.properties[selects.shift()]
    }
    return res
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {config.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar examples={examples} selected={selected} setSelected={setSelected}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Example name={selected} example={selectedExample()}/>
      </main>
    </div>
  );
}

export default App
