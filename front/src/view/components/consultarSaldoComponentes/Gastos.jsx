import axios from "axios";
import { useEffect, useState } from "react";

function Gastos({ cuentaActual }) {
  const [gastoSalida, setGastoSalida] = useState([]);
  const [gastoEntrada, setGastoEntrada] = useState([]);
  const [gastosPorCategoria, setGastoPorCategoria] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [mes, setMes] = useState('');

  useEffect(() => {
    const traerGastosSalida = async () => {
      let response = await axios
        .get(
        `http://localhost:3000/gastos?cuentaOrigen=${cuentaActual.id}`
        );
      setGastoSalida(response?.data);
    };
    traerGastosSalida();
    const traerGastosEntrada = async () => {
      let response = await axios
        .get(
          `http://localhost:3000/gastos?cuentaDestino=${cuentaActual.id}`
        );
      setGastoEntrada(response?.data);
    };
    traerGastosEntrada();
  }, []);

  useEffect(()=>{

    let nuevasCategorias = [...categorias];
  
    gastoEntrada.forEach(ge => {
      if(!nuevasCategorias.includes(ge.categoria)) {
        nuevasCategorias.push(ge.categoria);
      }
    });
  
    gastoSalida.forEach(gs => {
       if(!nuevasCategorias.includes(gs.categoria)) {
         nuevasCategorias.push(gs.categoria);
      }
    });
   
    setCategorias(nuevasCategorias);
  },[gastoEntrada,gastoSalida])

  useEffect(() => {
    
    const obtenerDatos = async () => {

      const resultados = await Promise.all(categorias.map(async categoria => {

        const [entradas, salidas] = await Promise.all([
          axios.get(`http://localhost:3000/gastos?cuentaDestino=${cuentaActual.id}&categoria=${categoria}`),
          axios.get(`http://localhost:3000/gastos?cuentaOrigen=${cuentaActual.id}&categoria=${categoria}`)  
        ]);

        const sumEntradas = entradas.data.reduce((acc, gasto) => acc + gasto.valor, 0);
        const sumSalidas = salidas.data.reduce((acc, gasto) => acc + gasto.valor, 0);

        return {categoria, sumEntradas, sumSalidas};

      }));

      setGastoPorCategoria(resultados);

    };

    obtenerDatos();

  }, [cuentaActual, categorias]);

  return (
  <>
    <input type="month" />
    {gastosPorCategoria?.map((c)=>{
        return(
            <div>
                <p>{"Categoría: $"+c.categoria.toLocaleString('es-CO')}</p>
                <p>{"Entradas : $"+c.sumEntradas.toLocaleString('es-CO')}</p>
                <p>{"Salidas : $"+c.sumSalidas.toLocaleString('es-CO')}</p>
                {/* <p>{c}</p> */}
            </div>
        )
    })}
  </>);
}

export default Gastos;
