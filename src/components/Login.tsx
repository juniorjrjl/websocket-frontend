import { FormEvent, useContext } from "react"
import { UserContext } from "../App"

const Login = () =>{
    const { login } = useContext(UserContext)

    const handleSubmit = async (evt: FormEvent<HTMLFormElement>) =>{
        evt.preventDefault()
        const formData = new FormData(evt.currentTarget)
        const name = formData.get('name')!.toString()
        login(name)
    }

    return (
        <>
            <h2>Crie seu usuário para começar</h2>
            <form className="inline-form" onSubmit={handleSubmit}>
                <input type="text" name="name" id="name" required />
                <button>
                    Entrar
                </button>
            </form>
        </>
    )
}

export default Login