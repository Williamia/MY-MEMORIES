import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import './Home.css';

export default function Home() {
    const [fotos, setFotos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const buscarFotos = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const resposta = await fetch('http://localhost:3000/api/viewphotos', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!resposta.ok) {
                    throw new Error(`Erro ao buscar fotos: ${resposta.statusText}`);
                }
                const dados = await resposta.json();
                setFotos(dados);
            } catch (error) {
                console.error('Erro ao buscar fotos:', error);
                setErro('Erro ao buscar fotos');
            } finally {
                setCarregando(false);
            }
        };

        buscarFotos();
    }, []);

    return (
        <div className="home-body">
            <Sidebar />
            <div className="home-content-photos">
                <div className="list-images">
                    {carregando ? (
                        <p>Carregando...</p>
                    ) : erro ? (
                        <p>{erro}</p>
                    ) : (
                        fotos.map(foto => (
                            <div key={foto._id} className="photo-item">
                                <img src={foto.imagem} alt={foto.nome} />
                                <p>{foto.nome}</p>
                                <p>{new Date(foto.data).toLocaleDateString()}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
