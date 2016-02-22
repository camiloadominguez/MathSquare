
 mathSquare = [];
    var operadores = ["+", "-", "*"]; //"/"
    //Para cargar el select...
    var select = nom_div("dimenEscenario");
    for (var i = 3; i<= 31; i+=2)
    {
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        select.appendChild(opt);
    }

    nom_div("dimenEscenario").addEventListener('change', function(event)
	{
		crearEscenario(Number(this.value));
	});

    //Para validar si la respuesta dada es válida o no...
    /*
    Validar que los valores dados sean igual a la respuesta de la Matriz...
    */
    var validaRespuesta = function(id)
    {
        valInput = Number(nom_div(id).value);
        partId = id.split("_");
        respustaMatriz = {
                                horizontal : mathSquare[Number(partId[0])][mathSquare.length - 1],
                                vertical : mathSquare[mathSquare.length - 1][Number(partId[1])]

        };

        respuesta = {
                            horizontal : {
                                            ecuacion : "",
                                            valor : 0,
                                            div : "div_" + partId[0] + "_" + (mathSquare.length - 1)
                            },
                            vertical :
                            {
                                ecuacion : "",
                                valor : 0,
                                div : "div_" + (mathSquare.length - 1) + "_" + partId[1]
                            }
        };
        arrayR=[];
        for(var i=0;i<mathSquare.length;i+=2)
        {
                arrayR.push(mathSquare[i][mathSquare.length - 1]);
        }
        for(var i=0;i<mathSquare.length;i+=2)
        {
                arrayR.push(mathSquare[mathSquare.length - 1][i]);
        }

        var contador=0;
        var arrayH=[];
        var arrayV=[];
        var fila=0;
        var col=0;
        var prueba="";
        var resultado="";
        while(fila<mathSquare.length)
        {
            
            prueba=prueba+nom_div(fila+"_"+col).value;
            
            
            if(prueba.length<(mathSquare.length-1))
                {
                    col=col+1;
                    prueba=prueba+mathSquare[fila][col];
                    col=col+1;
                    
                }

            else if(prueba.length==(mathSquare.length-1))
                        {
                            resultado=eval(prueba);
                            if(resultado==mathSquare[fila][col+1])
                                {
                                    arrayH.push(resultado);
                                    fila=fila +2;
                                    col=0;
                                    prueba="";
                                }
                            else
                                {
                                    arrayH="";
                                }
                        }
            else
                {
                    fila=fila +2;
                    col=0;
                }  
        }

            //verticales
        fila=0;
        col=0;
            while(col<mathSquare.length)
        {
            prueba=prueba+nom_div(fila+"_"+col).value;
            if(prueba.length<(mathSquare.length-1))
                {
                    fila=fila+1;
                    prueba=prueba+mathSquare[fila][col];
                    fila=fila+1;
                }

            else if(prueba.length==(mathSquare.length-1))
                {
                    resultado=eval(prueba);
                    //alert(resultado);
                    if(resultado==mathSquare[fila+1][col])
                        {
                            arrayV.push(resultado);
                            col=col +2;
                            fila=0;
                            prueba="";
                        }
                    else
                        {
                            arrayV="";
                        }
                }
            else
            {
                col=col +2;
                fila=0;
            }
        
        }

        var resultadoFinal = arrayH.concat(arrayV);

        for(var k=0;k<arrayR.length;k++)
        {
            if(arrayR[k]==resultadoFinal[k])
            {
                contador++;

            }
        }
        if(contador==arrayR.length)
        {
            alert("Lo lograste");
        }
        
    };

    var eventosInputs = function()
    {
        //Para establecer los eventos de los inputs...
        var inputs = document.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++)
        {
            nom_div(inputs[i].id).addEventListener("change", function(e)
            {
                validaRespuesta(this.id);
            });
        }
    };

    var crearEscenario = (function crearEscenario(dimension)
    {
        if(dimension % 2 !== 0)
        {
            mathSquare = [];
            var valorCelda = "";
            var i = c = 0;
            for(i = 0; i <= dimension; i++)
            {
                mathSquare.push([]);
                for(c = 0; c <= dimension; c++)
                {
                    if(i !== dimension && c !== dimension)
                    {
                        if(i % 2 === 0)
                        {
                            valorCelda = c % 2 === 0 ? Math.floor(Math.random() * 9) + 1 : operadores[Math.floor(Math.random() * operadores.length)];
                        }
                        else
                        {
                            valorCelda = c % 2 === 0 ? operadores[Math.floor(Math.random() * operadores.length)] : 0;
                        }
                        mathSquare[i][c] = valorCelda;
                    }
                    else
                    {
                        mathSquare[i][c] = 0;
                    }
                }
            }
            //Recorrer el array para crearlo en el escenario...
            var realizaOperacion = {horizontal : "", vertical : ""};
            var tabla = "<table id = 'chess_board' width = '50%' border = '0' align = 'center' cellpadding = '0' cellspacing = '0'>";
            for(i = 0; i <= dimension; i++)
            {
                if(i % 2 === 0)
                {
                    realizaOperacion.vertical = realizaOperacion.horizontal = "";
                    for(c = 0; c < dimension; c++)
                    {
                        realizaOperacion.horizontal += mathSquare[i][c];
                        realizaOperacion.vertical += mathSquare[c][i];
                    }
                    mathSquare[i][c] = eval(realizaOperacion.horizontal);
                    mathSquare[c][i] = eval(realizaOperacion.vertical);
                }
                //Para crear las celdas en el escenario...
                tabla += "<tr>";
                for(c = 0; c < dimension; c++)
                {
                    if(i % 2 === 0)
                    {
                        tabla += "<td>";
                        if(c % 2 === 0)
                        {
                            tabla += "<input type = 'number' id = '"+(i)+"_"+(c)+"' min = '1' max = '9'/>";
                            //mathSquare[i][c] = 0;
                        }
                        else
                        {
                            tabla += mathSquare[i][c];
                        }
                        tabla += "</td>";
                    }
                    else
                    {
                        if(c % 2 === 0)
                        {
                            tabla += "<td id = 'div_"+(i)+"_"+(c)+"'>" + mathSquare[i][c] + "</td>";
                        }
                        else
                        {
                            tabla += "<td style = 'background:black'>&nbsp;&nbsp;&nbsp;</td>";
                        }
                    }
                    tabla += "</td>";
                }
                if(i % 2 === 0)
                {
                    tabla += "<td id = 'div_"+(i)+"_"+(c)+"'>"+(mathSquare[i][c])+"</td>";
                }
                else
                {
                    tabla += "<td style = 'background:black'>&nbsp;&nbsp;&nbsp;</td>";
                }
                tabla += "</tr>";
            }
            tabla += "</tabla>";
            nom_div("escenario").innerHTML = tabla;
            eventosInputs();
            console.table(mathSquare);
        }
        else
        {
            alert("El valor para la matriz debe ser impar");
        }
        return crearEscenario;
    })(3);

    function nom_div(div)
    {
    	return document.getElementById(div);
    }

