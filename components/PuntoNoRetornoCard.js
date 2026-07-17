import React from "react";
import {
 View,
 Text,
 StyleSheet
} from "react-native";


export default function PuntoNoRetornoCard({
 punto,
 theme
}){


const getColor = ()=>{

 if(punto.nivel==="critico")
 return "#DC2626";


 if(punto.nivel==="alto")
 return "#EA580C";


 if(punto.nivel==="moderado")
 return "#CA8A04";


 return "#16A34A";

};



return (

<View
style={[
styles.card,
{
backgroundColor:theme.card,
borderColor:getColor()
}
]}
>


<Text
style={[
styles.title,
{
color:getColor()
}
]}
>

🔥 Punto de No Retorno

</Text>



<Text
style={[
styles.estado,
{
color:theme.text
}
]}
>

{
punto.nivel==="critico"
?
"🚨 Ya superaste el límite"
:
"⏳ Todavía estás a tiempo"
}

</Text>



<Text
style={[
styles.text,
{
color:theme.textSecondary
}
]}
>

Último momento recomendado:

</Text>


<Text
style={[
styles.date,
{
color:theme.text
}
]}
>

{
punto.fechaCritica.toLocaleString()
}

</Text>



<Text
style={[
styles.text,
{
color:theme.textSecondary
}
]}
>

Horas restantes:
{
punto.horasRestantes
}

</Text>



</View>


);

}



const styles=StyleSheet.create({

card:{
padding:20,
borderRadius:20,
borderWidth:2,
marginBottom:15
},

title:{
fontSize:20,
fontWeight:"bold",
marginBottom:10
},

estado:{
fontSize:18,
fontWeight:"bold"
},

text:{
marginTop:10,
fontSize:14
},

date:{
fontSize:16,
fontWeight:"bold",
marginTop:5
}


});