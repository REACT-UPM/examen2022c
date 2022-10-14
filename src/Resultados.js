import {useParams} from "react-router-dom";

export default function Resultados(props) {
  let { serverName } = useParams();
  let servidor = props.datos.find(({nombre})=>{ return nombre===serverName});
	return (<ul id="resultados">
      {servidor.contenido.quotes.map((item, index)=>{
        return <li key={index}>
          <div>Autor: {item.author}</div>
          <div>Cita: {item.quote}</div>
        </li>
      })}
    </ul>)
}

