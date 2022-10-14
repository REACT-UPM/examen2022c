import NotFound from "./NotFound";
import Resultados from "./Resultados";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import {useState} from "react";

const SERVERS = [
  {nombre: "Google", url: "https://dummyjson.com/quotes?limit=5&skip=0"},
   {nombre: "Amazon", url: "https://dummyjson.com/quotes?limit=5&skip=10"},
   {nombre: "Microsoft", url: "https://dummyjson.com/quotes?limit=5&skip=15"},
   {nombre: "Alibaba", url: "https://dummyjson.com/quotes?limit=5&skip=20"},
   {nombre: "JD", url: "https://dummyjson.com/quotes?limit=5&skip=25"},
   {nombre: "Yandex", url: "https://dummyjson.com/quotes?limit=5&skip=30"},
   {nombre: "Cloudfare", url: "https://dummyjson.com/quotes?limit=5&skip=35"}
];

export default function App(props){
  const [misServers, setMisServers] = useState(SERVERS);
  const [error, setError] = useState(null);

  async function callServer(serverllamado) {
    try {
      const response = await fetch(serverllamado.url);
      const data = await response.json();         
      console.log(data);
      if(response.status !== 200) {
        setError({ description: `Obtenido error al llamar al server ${serverllamado.nombre}. Código ${response.status}` });
      } else {
        setError(null);
        let nuevosServers = misServers.map((miserver, index) => {
          if(miserver.nombre === serverllamado.nombre) {
            //si es el server al que he llamado, guardo los datos recibidos en su objeto
            miserver.contenido = data;
          } 
          return miserver;
        });
        setMisServers(nuevosServers);
      }
    } catch (error) {
      console.log(error);
      setError({ description: error });
    }
  }

  return (<div>
      <h2>Click en el servidor para cargar datos</h2>
      {misServers.map((server, index)=>{
            return <span><button onClick={()=>callServer(server)}>Cargar {server.nombre}</button>{"  "}</span>
          })
        }
      <nav style={{borderBottom: "solid 1px", paddingBottom: "1rem"}}>
        {misServers.map((server, index)=>{
            if(server.contenido!==undefined){
              let path = "/servers/" + server.nombre;
              return <span><Link to={path}>Ver datos {server.nombre}</Link>{"  "}|{"  "}</span>  
            }
           })
        }
      </nav>
      <Routes>
        <Route path="/" element={<div></div>}/>
        <Route path="/servers/:serverName" element={<Resultados datos={misServers} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>);
}
