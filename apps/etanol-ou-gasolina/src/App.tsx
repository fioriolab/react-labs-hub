import { useState } from 'react'
import './App.css'
import logoImg from '../public/gasolina.png'

interface infoProps {
  title: string,
  etanol: string | number,
  gasolina: string | number
}

function App() {
  const [inputEtanol, setInputEtanol] = useState("Valor Etanol")
  const [inputGasolina, setInputGasolina] = useState("Valor Gasolina")
  const [values, inputValues] = useState<infoProps>()

  function verificar() {
    if(Number(inputEtanol) / Number(inputGasolina) > 0.7) {
        inputValues({
          title: 'Gasolina',
          etanol: convertaReal(Number(inputEtanol)),
          gasolina: convertaReal(Number(inputGasolina))
        })
      } else {
        inputValues({
          title: 'Etanol',
          etanol: convertaReal(Number(inputEtanol)),
          gasolina: convertaReal(Number(inputGasolina))
        })
      }
  }

  function convertaReal(value: number) {
    let valorConvertido = value.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })
    return valorConvertido
  }

  return (
    <>
      <main>

        <img src={logoImg} />

        <h1>Etanol ou Gasolina</h1>

        <div>
          <label htmlFor="etanol">Etanol (Preço por litro):</label> <br/>
          <input type="number" id="etanol" placeholder="Valor Etanol"
          value={inputEtanol} onChange={(e) => setInputEtanol(e.target.value)}/>
        </div>

        <div>
          <label htmlFor="gasolina">Gasolina (Preço por litro):</label> <br/>
          <input type="number" id="etanol" placeholder="Valor Gasolina"
          value={inputGasolina} onChange={(e) => setInputGasolina(e.target.value)}/>
        </div>

        <button onClick={verificar}>Verificar</button>

        {values && Object.keys(values).length > 0 && (
          <section>
            <h1>Compensa utilizar {values?.title}</h1>
            <p>Valor do Etanol: {values?.etanol}</p>
            <p>Valor da Gasolina: {values?.gasolina}</p>
          </section>
        )}
      </main>
    </>
  )
}

export default App
