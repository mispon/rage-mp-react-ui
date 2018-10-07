import '../styles/app.scss'

import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            time: new Date(),
            message: 'default message'
        }
    }

    componentDidMount() {
        EventManager.addHandler('onMessage', this.onMessage.bind(this))
        this.timerId = setInterval(() => {
            this.setState({time: new Date()})
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
        EventManager.removeHandler('onMessage', this.onMessage)
    }

    onMessage(value) {
        this.setState({message: value})
    }

    // send current url to client
    click() {
        let currentUrl = window.location.pathname        
        mp.trigger('showUrl', currentUrl)
    }

    render() {
        return(
            <div className="app">
                <h1>Make UI on React!</h1>
                <p className="current-time">{this.state.time.toLocaleTimeString()}</p>
                <p className="message">{this.state.message}</p>
                <button className="send-button" onClick={this.click}>Send</button>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))