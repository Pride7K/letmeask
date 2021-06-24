import { useHistory } from "react-router"
import illustrationImg from "../../assets/images/illustration.svg"
import logoImg from "../../assets/images/logo.svg"
import googleIconImg from "../../assets/images/google-icon.svg"
import {Button} from "../../components/Button/index"
import { useAuth } from "../../hooks/useAuth"
import {FormEvent} from "react"
import { useState } from "react"
import { database } from "../../services/firebase"
import "../../styles/auth.scss"

export function Home(){
    const history = useHistory()

    const {user,signInWithGoogle} = useAuth()

    const [roomCode,setRoomCode] = useState("")

    async function handleCreateRoom(){
        if(!user)
        {
            await signInWithGoogle()
        }
        history.push("/rooms/new")  
    }

    async function handleJoinRoom(event:FormEvent)
    {
        event.preventDefault();

        if(roomCode.trim() === "")
        {
            return;
        }
        
        const roomRef = await database.ref(`rooms/${roomCode}`).get()
        
        if(!roomRef.exists())
        {
            alert("this room does not exists!")
            return;
        }

        history.push(`/rooms/${roomCode}`)  
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="LetmeAsk" />
                    <button onClick={handleCreateRoom} className="createRoom">
                        <img src={googleIconImg} alt="" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                        type="text" 
                        name="" 
                        value={roomCode}
                        onChange={event => setRoomCode(event.target.value)}
                        placeholder="Digite o código da sala"
                        id="" />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}