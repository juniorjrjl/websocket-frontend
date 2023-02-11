import { FormEvent, useContext, useEffect, useState } from "react"
import { UserContext } from "../App"
import TopicRoom from "./TopicRoom"
import TopicsList from "./TopicsList"

export type Topic = {
    _id: string
    title: string
}

const Home = () =>{
    const { user, logout } = useContext(UserContext)
    const [topics, setTopics] = useState<Topic[]>([])
    const [openTopic, setOpenTopic] = useState<Topic | null>(null)

    const handleSubmit = async (evt: FormEvent<HTMLFormElement>) =>{
        evt.preventDefault()

        const formDate = new FormData(evt.currentTarget)
        const title = formDate.get("title")!.toString()
        evt.currentTarget.reset()

        const data = await fetch("http://localhost:3000/topics", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({ title })
        }).then(res => res.json())

        setTopics([...topics, data])
    }

    const fetchTopics = async () =>{
        const data = await fetch("http://localhost:3000/topics").then(res => res.json())
        setTopics(data)
    }

    useEffect(() => { fetchTopics() }, [])

    return(
        openTopic ?
            <>
                <TopicRoom topic={openTopic} setOpenTopic={setOpenTopic}/>
            </>:
            <>
                <header>
                    <h2>Olá, {user?.name}</h2>
                    <nav>
                        <button onClick={logout}>Sair</button>
                    </nav>
                </header>
                <h3 className="form-title">Crie um tópico para conversar sobre seus assuntos preferidos</h3>
                <form className="inline-form" onSubmit={handleSubmit}>
                    <input type="text" name="title" id="title" required/>
                    <button type="submit">Criar</button>
                </form>
                <TopicsList topics={topics} setTopics={setTopics} setOpenTopic={setOpenTopic}/>
            </>
    )

}

export default Home