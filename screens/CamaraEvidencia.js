import React, { useRef, useState, useEffect } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";

import {
  CameraView,
  useCameraPermissions
} from "expo-camera";



export default function CamaraEvidencia({ navigation }) {


  const cameraRef = useRef(null);
  const videoRef = useRef(null);


  const [permission, requestPermission] =
    useCameraPermissions();


  const [photo, setPhoto] = useState(null);



  // Cámara móvil
  const [facing, setFacing] =
    useState("back");


  // Cámara web

  const [webStream, setWebStream] =
    useState(null);


  const [webFacing, setWebFacing] =
    useState("environment");




  /*
  ==========================
  CÁMARA WEB
  ==========================
  */


  useEffect(()=>{


    if(Platform.OS==="web"){

      startWebCamera();

    }


    return ()=>{

      stopWebCamera();

    };


  },[]);




  const startWebCamera = async()=>{


    try{


      const stream =

      await navigator.mediaDevices.getUserMedia({

        video:{
          facingMode:webFacing
        },

        audio:false

      });



      setWebStream(stream);



      if(videoRef.current){

        videoRef.current.srcObject =
          stream;

      }



    }catch(error){

      console.log(
        "Error cámara web:",
        error
      );

    }


  };





  const stopWebCamera = ()=>{


    if(webStream){


      webStream
      .getTracks()
      .forEach(track=>track.stop());


    }


  };





  /*
  ==========================
  CAMBIAR CÁMARA
  ==========================
  */


  const flipCamera = ()=>{


    setFacing(current=>

      current==="back"
      ?
      "front"
      :
      "back"

    );


  };






  const flipWebCamera = async()=>{


    stopWebCamera();



    const newFacing =

    webFacing==="environment"
    ?
    "user"
    :
    "environment";



    setWebFacing(newFacing);



    try{


      const stream =

      await navigator.mediaDevices.getUserMedia({

        video:{
          facingMode:newFacing
        },

        audio:false

      });



      setWebStream(stream);



      if(videoRef.current){

        videoRef.current.srcObject =
          stream;

      }



    }catch(error){

      console.log(
        "Error cambiando cámara:",
        error
      );

    }


  };






  /*
  ==========================
  PERMISOS MÓVIL
  ==========================
  */


  if(Platform.OS !== "web"){



    if(!permission){


      return (

        <View style={styles.center}>

          <Text>
            Cargando cámara...
          </Text>

        </View>

      );


    }




    if(!permission.granted){


      return (

        <View style={styles.center}>


          <Text style={{
            marginBottom:15
          }}>

            Necesitamos acceso a la cámara

          </Text>



          <TouchableOpacity

            style={styles.button}

            onPress={requestPermission}

          >

            <Text style={styles.white}>

              Permitir cámara

            </Text>


          </TouchableOpacity>



        </View>


      );


    }


  }







  /*
  ==========================
  TOMAR FOTO MÓVIL
  ==========================
  */


  const takeMobilePhoto = async()=>{


    if(!cameraRef.current)
      return;



    try{


      const picture =

      await cameraRef.current
      .takePictureAsync();



      if(picture?.uri){


        setPhoto(
          picture.uri
        );


      }



    }catch(error){


      console.log(
        "Error foto:",
        error
      );


    }


  };







  /*
  ==========================
  TOMAR FOTO WEB
  ==========================
  */


  const takeWebPhoto = ()=>{


    const video =
      videoRef.current;



    if(!video)
      return;




    const canvas =
      document.createElement(
        "canvas"
      );



    canvas.width =
      video.videoWidth;


    canvas.height =
      video.videoHeight;



    const ctx =
      canvas.getContext(
        "2d"
      );



    ctx.drawImage(

      video,

      0,

      0,

      canvas.width,

      canvas.height

    );



    const image =

    canvas.toDataURL(
      "image/png"
    );



    setPhoto(image);


  };







  /*
  ==========================
  CONTINUAR
  ==========================
  */


  const continueFlow = ()=>{


    if(!photo){

      console.log(
        "No existe foto"
      );

      return;

    }




    console.log(
      "Foto enviada:",
      photo
    );



    navigation.navigate(

      "Tabs",

      {

        screen:"NuevaSimulacion",

        params:{

          foto:photo

        }

      }

    );


  };







  return (


    <View style={styles.container}>


      {
        !photo

        ?

        <>


          {
            Platform.OS !== "web"


            ?

            <CameraView

              ref={cameraRef}

              style={styles.camera}

              facing={facing}

            />


            :


            <video

              ref={videoRef}

              autoPlay

              playsInline

              style={{

                width:"100%",

                height:"100%",

                objectFit:"cover"

              }}

            />


          }






          <View style={styles.controls}>


            <TouchableOpacity

              style={styles.button}

              onPress={

                Platform.OS==="web"

                ?

                flipWebCamera

                :

                flipCamera

              }

            >

              <Text style={styles.white}>

                🔄 Cambiar cámara

              </Text>


            </TouchableOpacity>





            <TouchableOpacity

              style={[

                styles.button,

                {
                  marginTop:15
                }

              ]}

              onPress={

                Platform.OS==="web"

                ?

                takeWebPhoto

                :

                takeMobilePhoto

              }


            >


              <Text style={styles.white}>

                📸 Capturar evidencia

              </Text>



            </TouchableOpacity>



          </View>



        </>



        :


        <View style={styles.center}>


          <Text style={styles.white}>

            Foto lista 📸

          </Text>





          <TouchableOpacity

            style={styles.button}

            onPress={()=>setPhoto(null)}

          >

            <Text style={styles.white}>

              🔄 Volver a tomar

            </Text>


          </TouchableOpacity>






          <TouchableOpacity


            style={[

              styles.button,

              {

                backgroundColor:"#16a34a",

                marginTop:15

              }

            ]}



            onPress={continueFlow}


          >


            <Text style={styles.white}>

              ▶ Continuar

            </Text>


          </TouchableOpacity>




        </View>


      }



    </View>


  );


}





const styles = StyleSheet.create({


  container:{

    flex:1,

    backgroundColor:"#000"

  },


  camera:{

    flex:1

  },


  controls:{

    position:"absolute",

    bottom:50,

    width:"100%",

    alignItems:"center"

  },


  button:{

    backgroundColor:"#1f1f1f",

    paddingVertical:14,

    paddingHorizontal:25,

    borderRadius:30,

    borderWidth:1,

    borderColor:"#fff"

  },


  white:{

    color:"#fff",

    fontWeight:"bold"

  },


  center:{

    flex:1,

    justifyContent:"center",

    alignItems:"center",

    padding:20

  }


});