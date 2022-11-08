import { element } from "prop-types";
import React, { useEffect, useState } from "react";


const Home = () => {

	const [array, setArray] = useState([])
	const [input, setInput] =useState("")

	const changeInputvalue = (e) => {
		setInput(e.target.value)
	}

    // FUNCION GET //


    const getAllelements = () => {
		var requestOptions = {
			method: 'GET',
			redirect: 'follow'
		  };
		  
		  fetch("https://assets.breatheco.de/apis/fake/todos/user/chuchoazuara", requestOptions)
			.then(response => response.json())
			.then(result => setArray(result))
			.catch(error => console.log('error', error));
	}

	// FUNCION POST //

	const createElement = () => {
		var myHeaders = new Headers();
         myHeaders.append("Content-Type", "application/json");


		 let agregar = array.concat( {
			"label": input,
			"done": false
		  })

         var requestOptions = {
           method: 'PUT',
           headers: myHeaders,
           body: JSON.stringify(agregar),
           redirect: 'follow'
         };

        fetch("https://assets.breatheco.de/apis/fake/todos/user/chuchoazuara", requestOptions)
          .then(response => response.json())
          .then(result => getAllelements())
          .catch(error => console.log('error', error));
	        }
    
	// FUNCION DELETE //

	const deleteElement = (element) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");


		let eliminar = array.filter(task => task != element)
		console.log(eliminar)

		var requestOptions = {
		  method: 'PUT',
		  headers: myHeaders,
		  body: JSON.stringify(eliminar),
		  redirect: 'follow'
		};

	   fetch("https://assets.breatheco.de/apis/fake/todos/user/chuchoazuara", requestOptions)
		 .then(response => response.json())
		 .then(result => getAllelements())
		 .catch(error => console.log('error', error));
		   }

	return (
		<div className="container">
			<h1>Lista Tareas</h1>
			{
				array.map(((element, index) => 
					<div className="row">
						<div className="col-4"></div>
						<div className="col-4 contenedorTarea">
						      <p  key={index} className="tareaTexto">
								{element.label}
					          <button className="botonEliminar ms-5" onClick={() => deleteElement(element)}>Eliminar</button>
					          </p>
						</div>

						 <div className="col-4"></div>
					</div>

				))
			}

			<p><input className="input" onChange={changeInputvalue} type="text" /></p>
			<button  onClick={getAllelements}>Obtener lista</button>
			<button className="ms-3" onClick={createElement}>Create Element</button>
		</div>
	)
}

export default Home;
