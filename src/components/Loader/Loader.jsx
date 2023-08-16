import { BallTriangle } from 'react-loader-spinner'
import { Component } from 'react'
export class Loader extends Component  {
    state={
    visible	:false,
    }
    componentDidMount() {
        this.setState({visible: false})
    }
    render() {
        return <div className="loader">
        <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
        />
    </div>
        }
   
}

export default Loader

