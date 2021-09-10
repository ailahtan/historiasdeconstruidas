import React from "react";
import Data from "./components/data.json";

class App extends React.Component {

  constructor(props) {
    super(props);
   
    this.state = {
      
      contador: 1,
      id: "",
      historia: "",
      opcion1: "",
      opcion2: "",
      opcionMostrada: "",
      arrayDeOpcionesElegidas: []
    };
  }

  componentDidMount(){
    this.setState({
      id : Data[0].id,
      historia : Data[0].historia,
      opcion1 : Data[0].opciones.a,
      opcion2 : Data[0].opciones.b
    });
  }

  activarClickBoton(opcionescogida) {
    
    
    if(this.state.contador<5){
      let contadorQueSuma = this.state.contador+1 
      let array = this.state.arrayDeOpcionesElegidas 
      array.push(opcionescogida)
      this.setState({
        arrayDeOpcionesElegidas: array,
        opcionMostrada: opcionescogida.toUpperCase(),
        contador: contadorQueSuma,
        id: contadorQueSuma+opcionescogida
      });

    }else {
      alert("Llegaste al final, intenta otra historia.")
      this.setState({
        id : Data[0].id,
        historia : Data[0].historia,
        opcionA  : Data[0].opciones.a,
        opcionB  : Data[0].opciones.b,
        contador : 1,
        arrayDeOpcionesElegidas : []
      });
    }
  }

  componentDidUpdate(prevProps, prevState){

    let encontradorPosicion = Data.find( e => e.id === this.state.id )
    console.log(encontradorPosicion);
    if(prevState.id !== encontradorPosicion.id){ 
    this.setState({
      id : encontradorPosicion.id,
      historia : encontradorPosicion.historia,
      opcion1 : encontradorPosicion.opciones.a,
      opcion2 : encontradorPosicion.opciones.b
     });
    }
  }

  render() {
    let recuentoDeCapitulos = this.state.arrayDeOpcionesElegidas;
    let listaDeCapitulos = recuentoDeCapitulos.map((laopcionqueguardo, index) => <li style={{ textTransform: 'uppercase'}} key={index}>{laopcionqueguardo}</li>);
    return (
      <div className="layout">
          <h1 className="historia">{this.state.historia}</h1> 
          <div className="opciones">
            <div className="opcion">
              <button  onClick={()=>this.activarClickBoton("a")} className="botones">A</button>
              <h2>{this.state.opcion1}</h2>
            </div>
            <div className="opcion">
              <button onClick={()=>this.activarClickBoton("b")} className="botones">B</button>
              <h2>{this.state.opcion2}</h2>
            </div>
          </div>
        <div className = "recordatorio">
          <h3> Seleccion anterior: {this.state.opcionMostrada} </h3>
          <h3 className="historial"> Historial de opciones: </h3>
          <ul>{listaDeCapitulos}</ul>
        </div>
      </div>
    );
  }
}
export default App;
