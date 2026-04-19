# Demonios Gump, eres un genio: el Task Manager de Windows NT 4.0

Si alguna vez sentiste que tu PC estaba a punto de explotar y el fiel Ctrl + Alt + Supr fue tu única tabla de salvación, le debés un café a David Plummer. Este veterano ingeniero de Microsoft no solo creó el Administrador de Tareas, sino que lo diseñó para ser, literalmente, indestructible.

Lo más increíble no es solo lo que hace, sino cómo lo hace. Aquí te cuento un par de secretos de su arquitectura que te van a volar la cabeza.

<p align="center">
    <img src="./assets/img/posts/20260419taskmanager/content/taskmanager.webp"
         alt="loom.gif"
         width="400"
         />
</p>

## La ligereza como superpoder
Hoy estamos acostumbrados a aplicaciones que devoran gigabytes de RAM, pero el "Task Manager" original era una obra maestra de la eficiencia: ocupaba apenas 80 KB.
¿Por qué tan chico? Plummer sabía que si el sistema estaba colapsando, el hardware iba a estar bajo mínimos. Al ser tan diminuto, el Administrador de Tareas podía "colarse" en la memoria y ejecutarse sin problemas incluso cuando el resto de Windows ya se había rendido.
## El truco del "mensaje privado"
Pero lo más ingenioso era cómo manejaba las instancias abiertas. La mayoría de los programas simplemente revisan si ya hay una copia funcionando y, si la hay, no hacen nada. Pero Plummer fue más allá.

Él sabía que, si estás intentando abrir el Administrador de Tareas, es probable que algo ande mal. Por eso, el sistema funciona así:

* Al intentar abrirlo, el programa envía un mensaje privado a la ventana que ya está abierta.
* Si esa ventana responde, el sistema entiende que todo está bajo control y simplemente te la muestra.
* Pero (y acá está el truco), si la ventana no responde, el sistema asume que el proceso se congeló. En lugar de dejarte colgado, ignora la instancia vieja y abre una nueva desde cero.

Es una solución elegante para un problema crítico: asegurar que el usuario siempre tenga el control, pase lo que pase.

## El genio detrás del Task Manager
Si te gusta la tecnología, el nombre de David Plummer debería resultarte familiar, aunque durante décadas fue uno de esos héroes anónimos de Microsoft. David es un ingeniero canadiense que no tuvo el camino típico del "niño prodigio" de Silicon Valley. De hecho, dejó la escuela secundaria antes de graduarse, trabajó en un 7-Eleven y recién a los 21 años decidió retomar los estudios y graduarse.

<p align="center">
    <img src="./assets/img/posts/20260419taskmanager/content/davidplummer.webp"
         alt="loom.gif"
         width="400"
         />
</p>

En 1993, entró a Microsoft como pasante y terminó quedándose más de una década. Lo que lo hace especial no es solo su talento técnico, sino su mentalidad práctica. Muchas de las herramientas que usamos hoy nacieron como proyectos personales que él escribía en su tiempo libre simplemente porque "faltaban" en el sistema:

* El Administrador de Tareas: Lo programó en el estudio de su casa a finales de 1994. Cuando se lo mostró a los jefes de Windows NT, les encantó tanto que lo incluyeron como parte oficial del sistema.

* El Pinball de Windows: Él fue quien adaptó el famoso Space Cadet Pinball para que funcionara en Windows NT, convirtiendo código complejo para que fuera fluido en las máquinas de esa época.

* Archivos ZIP y más: También le debemos la integración nativa de los archivos .zip en Windows y gran parte de la interfaz de usuario de las versiones clásicas.
   
David se retiró de Microsoft en 2003, pero hace unos años volvió a la escena pública con un canal de YouTube brillante llamado Dave's Garage. Ahí no solo cuenta anécdotas de la "época dorada" de Windows, sino que también habla abiertamente sobre su diagnóstico de autismo.