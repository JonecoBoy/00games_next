import { Alert } from '@mui/material'
import { withRouter } from 'next/router'

 function Message(props:any) {
    let state;
    try{
        // avoid error because of ASCII coding
        state = JSON.parse(props.router.query.message)
    }
    catch(e){
        state=null;
    }
    // const state = JSON.parse(props.router.query.message)
  return (
    
      <div className='messages'>
        {state && <><Alert variant="filled" severity={state.type}>{state.message}</Alert> <div className='message-spacer'></div></>}

        <style jsx>{`
        .message-spacer{
          margin-top:20px;
        }
      `}
    </style>
      </div>
  )
}

export default withRouter(Message)