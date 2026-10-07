
            /*Crear producto, enviando peticion a metodo POST a traves de los datos de un FORM */
           console.log("CORRIENDO JS DE CREATE");
            const URL = "http://localhost:3000"
            let altaProducts_container = document.getElementById("altaProducts-container");
            const productList = document.querySelector(".product-list");

                altaProducts_container.addEventListener("submit", async (event) =>{
                event.preventDefault(); //prevenimos el envio de datos por defecto del FORM
                    
                //convertir los clave-valor del formData en objeto.
                let producto = Object.fromEntries(new FormData(event.target));
                //console.log(`Product ${JSON.stringify(producto)}`);
            
                //let producto = Object.fromEntries(formData);

                try {
                    let response = await fetch(`${URL}/api/products`,{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(producto) //parsea el objeto js a json para enviarlo por http
                });

                if(response.ok){
                    console.log(response);
                    let result  = await response.json();
                    console.log(`${result.message} - Id Product : ${result.idProduct}`);
                }else
                 throw new Error("Erorr al insertar, no se a creado el producto");
                  
                } catch (err) {
                    console.error(err);
                    console.log(`Error en la conexion al enviar los datos del producto`, err);
                }
            });
            //LOGICA DE RENDERIZAR LA CARD DEL PRODUCTO AL SER RETORNADO Y, HACER UN PUSH AL ARRAY DE PRODUCTOS.
  
            const altaUseForm = document.getElementById("altaUser-form");
            altaUseForm.addEventListener("submit", async  event => {
                event.preventDefault();
                console.log("creando usuario submit form user");

                let formData = Object.fromEntries(new FormData(event.target));
                    console.log("datos form : ", formData);
                try {
                      const response = await fetch(`${URL}/api/user`,{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(formData)
                    });
                    
                    const result  = await response.json();
                     console.log("STATUS:", response.status);
                    console.log("RESULTADO DEL SERVIDOR:", result);

                    if (response.ok) {
                        console.log(`${result.message} - Id usuario: ${result.userID}`);
                    } else {
                        throw new Error(result.message || "Error al crear usuario");
                    }

                } catch (error) {
                        console.log( error.message);
                }
            });