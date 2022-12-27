import { Spinner } from 'react-bootstrap'

import  '../styles/components/Loader.scss'
const Loader = () => {
    const style = {
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    return (
        <div style={style}>
            <Spinner animation="grow" variant="primary" />
        </div>
    )
}

export default Loader