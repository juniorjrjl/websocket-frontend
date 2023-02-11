import { Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState } from "react"
import { Topic } from "./Home"
import { io } from "socket.io-client"
import { User, UserContext } from "../App"
import MessageBox from "./messageBox"

type TopicRoomProps = {
    topic: Topic
    setOpenTopic: Dispatch<SetStateAction<Topic | null>>
}

const socket = io("ws://localhost:3000")

export type Message = {
    _id: string,
    content: string,
    author?: User
    createdAt: string
}

const TopicRoom = ({ topic, setOpenTopic }: TopicRoomProps) =>{
    const { user } = useContext(UserContext)
    const [messages, setMessages] = useState<Message[]>([])

    const handleSubmit = async (evt: FormEvent<HTMLFormElement>) =>{
        evt.preventDefault()
        const formData = new FormData(evt.currentTarget)
        const content = formData.get("message")!.toString()
        evt.currentTarget.reset()
        socket.emit("send_message", { content, author: user, topicId: topic._id })
    }
    
    const loadMessages =async () => {
        const data = await fetch(`http://localhost:3000/topics/${topic._id}`).then(res => res.json())
        setMessages(data.messages)
    }

    useEffect(() => { loadMessages() }, [])
    useEffect(() => { 
        socket.emit("join_room", { name: user?.name, topicId: topic._id }) 
        
        socket.on("new_message", (newMessage: Message) => setMessages((mostRecentState) => [...mostRecentState, newMessage]))

        return () =>{
            socket.emit("leave_room", { name: user?.name, topicId: topic._id })
            socket.off("new_message")
        }

    }, [socket])

    return(
        <>
            <main className="room">
                <header>
                    <h2>{topic.title}</h2>
                    <button onClick={() => setOpenTopic(null)}>Voltar</button>
                </header>

                <section className="messages">
                    {messages.map((m, i) => <MessageBox message={m} key={i}/>)}
                </section>

                <form className="send-message-form inline-form" onSubmit={handleSubmit}>
                    <input type="text" name="message" id="message" placeholder="Digite sua mensagem" required/>
                    <button>Enviar</button>
                </form>
            </main>
        </>
    )
}

export default TopicRoom