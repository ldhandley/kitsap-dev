import {OrderForm} from "./demos/demo-web-ordering-form" 
import {Page} from "./Components/Page"

function Demos(){


  return(
    <>
      <Page title="Demos">
        <h2>Point of Sale Demo</h2>
        <OrderForm/>
      </Page>
    </>
  )
}

export default Demos;
