import { useState } from 'react'
import { Button, View } from 'react-native';


function App() {
   const [frid, setFrid] = useState([]);
  const getFridnsList = async() => {
    console.log("inside the fetch function");
    
    const res = await fetch("http://localhost:3000/friends")
    setFrid((await res.json()).friends);
  }
  return (
    <View>
    {
      frid?.map(one =>  
        (
          <h1>{one}</h1>
        ))
    }
     <Button onPress={getFridnsList} title='get friends'/>
    </View>
  )
}

export default App
