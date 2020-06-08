import React, { useState } from 'react';
import {StyleSheet,TextInput,View,Button,FlatList,Keyboard,Image,Text,ImageBackground, ActionSheetIOS} from 'react-native';
import Axios from 'axios';

export default function App() {
    const [barcode, setBarCode] = useState('');
    const [quantity, setQuantity] = useState('');
    const [name, setName] = useState('');
    const [expirationdate, setExpirationDate] = useState('');

    const [apiResponse, setApiResponse] = useState([]);

    const searchBarCode = (barcode) => {
        setBarCode(barcode);
    }

    const searchQuantity = (quantidade) => {
        setQuantity(quantidade);
    }

    const searchName = (name) => {
        setName(name);
    }

    const searchExpirationDate = (name) => {
        setExpirationDate(name);
    }

    const buscarCidades = () => {
        getAll();   
        Axios({
            method: 'post',
            mode: 'no-cors',
            url: 'http://172.25.144.1:54217/api/Item/InsertItem',
            data: {
                barCode: barcode,
                quantity: quantity,
                name: name,
                expirationDate: expirationdate
            },
            headers: {
                'Access-Control-Allow-Origin': '172.25.144.1',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Accept-Language': 'pt-BR',
                'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
            }          
          }).then(function(result) {
            getAll();      
          })
          .catch(function(error) {
            console.log('What happened? ' + error.response);
            getAll(); 
          });    
          
          getAll();          

    }


    function getAll() {

        fetch('http://localhost:54217/api/GetAll/GetAllLegalNature')
        .then(function(response){
        response.json().then(function(data){
            setApiResponse(data);    
        console.log(data); 
        });
        })
        .catch(function(err){ 
        console.error('Failed retrieving information', err);
        });
    }
    
       function deleteItem(deleteBarCode) {
        getAll();   

        Axios({
            method: 'delete',
            mode: 'no-cors',
            url: 'http://172.25.144.1:54217/api/DeleteItem/DeleteItem',
            data: {
                barCode: deleteBarCode
            },
            headers: {
                'Access-Control-Allow-Origin': '172.25.144.1',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Accept-Language': 'pt-BR',
                'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
            }          
          }).then(function(result) {
            console.log('Logging result ' + result);
            getAll();
            
          })
          .catch(function(error) {
            console.log('What happened? ' + error.response);
            getAll(); 
          }); 

          getAll();

       }
        
    

    return (

        <View style={estilos.tela}>
            <ImageBackground source={require('./Imagens/fundo2.jpg')} style={estilos.fundo}>
                <View style={estilos.busca}>
                    <TextInput placeholder="Código de Barras" style={estilos.input} value={barcode} onChangeText={searchBarCode}/>
                    <TextInput placeholder="Quatidade" style={estilos.input} value={quantity} onChangeText={searchQuantity}/>
                    <TextInput placeholder="Nome do produto" style={estilos.input} value={name} onChangeText={searchName}/>
                    <TextInput placeholder="Data de Validade" style={estilos.input} value={expirationdate} onChangeText={searchExpirationDate}/>
                    <Button title="Cadastrar" onPress={buscarCidades} />
                </View>

                <FlatList data={apiResponse} renderItem={ forecast => (
                     <View style={estilos.cartao}>
                         <View style={estilos.item}>
                            <View style={estilos.itens}>
                            <Text style={estilos.nomeCidade}> {forecast.item.name} </Text>
                            <Text style={estilos.resultado}>{"Quantidade: "+forecast.item.quantity}</Text>
                            <Text style={estilos.resultado}>{"Validade: "+forecast.item.expirationDate} </Text>
                            <Text style={estilos.resultado}>{"Código de Barras: "+forecast.item.barCode} </Text>
                            
                            <Button title="Deletar Unidade" onPress={ () => deleteItem(forecast.item.barCode)} />
                            </View>
                         </View>
                     </View>
                )} 
                />            
            </ImageBackground>
        </View>
    );
}

const estilos = StyleSheet.create({
    tela: {
        flexDirection: 'column',
        flex: 2,
        textAlign: "center",
    },
    busca: {
        textAlign: "center",
        marginBottom: 10
    },
    fundo: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    icones: {
        width: 50,
        height: 50
    },
    nomeCidade: {
        color: 'black',
        fontWeight:'bold',
        fontSize: 50,
        padding: 10,
        flexDirection: 'column',
        textTransform: 'uppercase'
    },
    itens: {
        flexDirection: 'column',
        fontWeight:'bold',
        alignItems: 'left'
    },
    resultado: {
        marginTop: 10,
        marginHorizontal: 2,
        flexDirection: 'column',
        fontWeight:'bold',
        alignItems: 'left',
        textAlign:'left'
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 20,
        fontWeight:'bold'
    },
    cartao: {
        marginBottom: 5,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 30,
        fontWeight:'bold'
    },
    item: {
        alignItems: 'center',
        flexDirection: 'column',
        fontWeight:'bold'
    },
    input: {
        color: 'black',
        fontWeight:'bold',
        fontSize: 20,
        padding: 10,
        borderBottomColor: 'black',
        marginbottom: 10,
        textAlign: "center",
        marginBottom: 10,
        textTransform: 'uppercase'
    },
    botao:{
        color: '#00BFFF',
        borderRadius: 40,
        textAlign: "center",
        width:40,
        height:30,
        borderRadius: 40
    }

}); 