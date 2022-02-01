import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {bannerBackgroundColor, h2TagColor, jumbotronContrastingColor} from "../theme"

export function Page(props){

  return(
    <div className="">
      <Container style={{ width: "100%", maxWidth: "100%", position: "relative" }}>
        <Box sx={{ backgroundColor:bannerBackgroundColor, backgroundPosition: "center", backgroundSize: "cover" }}>
          <h1 style={{color: jumbotronContrastingColor, margin: 0, marginLeft: 10 }}>{props.title}</h1>
        </Box>
      </Container>
      <Container maxWidth="md">
        {props.children}
        <div style={{padding:100}}/>
      </Container>
    </div>
  )
}
