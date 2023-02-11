import { Dispatch, SetStateAction } from "react"
import { Topic } from "./Home"

type TopicListProps = {
    topics: Topic[]
    setTopics: Dispatch<SetStateAction<Topic[]>>
    setOpenTopic: Dispatch<SetStateAction<Topic | null>>
}

const TopicsList = ({ topics, setTopics, setOpenTopic }: TopicListProps) =>{

    const deleteTopic = async (id: string) =>{
        await fetch(`http://localhost:3000/topics${id}`, { method: 'DELETE' })
        const updatedTopics = topics.filter(t => t._id !== id)
        setTopics(updatedTopics)
    }

    return(
        <>
            <main id="topics">
                {topics.length === 0 ?
                    <h3>Não hé tópicos cadastrados</h3> :
                    topics.map(t =>(
                        <div className="topic" key={t._id}>
                            <h2>{t.title}</h2>
                            <div>
                                <button onClick={() => setOpenTopic(t)}>Entrar na Sala</button>
                                <button onClick={() => deleteTopic(t._id)}>Excluir</button>
                            </div>
                        </div>
                    ))
                }
            </main>
        </>
    )
}

export default TopicsList