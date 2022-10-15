import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'


// 設定
const URL = 'wss://bf67-113-42-16-83.jp.ngrok.io'
const PROTOCOL = 'ws-sample'

// WebSocket 通信を開始する
const socket = new WebSocket(URL, PROTOCOL)

function App() {
  const [ input, setInput ] = useState('hogehoge');
  const [ receivedMessage, setReceivedMessage ] = useState([]);

  const handleInput = (e) => {
    if (e?.target) {
      setInput(e.target.value);
    }
  }

  const handleSubmit = () => {
    socket.send(input) // メッセージの送信
  }

  useEffect(() => {

    // ------------------------------
    // WebSocket イベント
    // ------------------------------

    // WebSocket が開通したら発火する
    // socket.onopen = () => {} でも可
    socket.addEventListener('open', (event) => {
      console.log('open')
      /* socket.send('メッセージ') // メッセージの送信 */
    })

    // WebSocketサーバ からメッセージを受け取ったら発火する
    // socket.onmessage = () => {} でも可
    socket.addEventListener('message', ({ data }) => {
      console.log('message: ' + data)
      setReceivedMessage(prevState => ([ ...prevState, data]));
      /* socket.close() */
    })

    // WebSocketサーバ からエラーメッセージを受け取ったら発火する
    // socket.onerror = () => {} でも可
    socket.addEventListener('error', (event) => {
      console.log('error')
    })

  }, []);

  return (
    <div className="App">
      <input value={input} onChange={handleInput} />
      <button onClick={handleSubmit}>送信</button>
      <div>
        メッセージ：
        {receivedMessage.map((message, index) => (
          <div key={index}>{index + 1}件目：{message}</div>
        ))}
      </div>
    </div>
  )
}

export default App
