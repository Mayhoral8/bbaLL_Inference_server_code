import React from 'react'
import {ClipLoader} from 'react-spinners'

const Spinner = ({width, height}) => {
    return(
        <div style = {{width, height, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <ClipLoader color = '#C4C4C4' size = '' loading = {true}/>
        </div>
    )
}

export default Spinner