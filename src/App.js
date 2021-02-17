import './App.css';
import 'fontsource-roboto';
import {Container, Grid, Paper, Button} from '@material-ui/core';

function App() {
  return (
      <Container maxWidth="sm">
          <Grid container spacing={5}>
              <Grid item xs={6}>
                  <Paper>Hello, welcome to ProjectForecast!</Paper>
              </Grid>
              <Grid item xs={6}>
                  <Button variant="outlined">This is a BUTTON!</Button>
              </Grid>
              <Grid item xs={2}>
                  <Paper>Hello</Paper>
              </Grid>
              <Grid item xs={2}>
                  <Paper>Hello</Paper>
              </Grid>
              <Grid item xs={2}>
                  <Paper>Hello</Paper>
              </Grid>
              <Grid item xs={2}>
                  <Paper>Hello</Paper>
              </Grid>
          </Grid>
      </Container>
  );
}

export default App;
